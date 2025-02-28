const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('user route testing!'));

// router
//   .get('/me', auth (req, res) {
//     const promise = new Promise((req, res) => {
//       const user = User.findById(req.user.id)
//     })
//     .then(res => { res.json(user) })
//     .catch(res => {res.send({ message:'Error in Fetching user'})
//   })
// });

router.post(
  "/register",
  [
    check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    
    const {
      username,
      password
    } = req.body;
    try {
      let user = await User.findOne({
        username
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }
      
      user = new User({
        username,
        password
      });
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();
      
      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      };
      
      jwt.sign(
        payload,
        process.env.JWT_TOKEN_SECRET, // jwt secret
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { username, password } = req.body;
    console.log(req)
    try {
      let user = await User.findOne({
        username
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password!"
        });

      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_TOKEN_SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.get('/me', auth, (req, res) => {
    User.findById(req.user.id)
    .then(user => res.json(user))
    .catch(e => res.send({ message: "Error in Fetching user" }));
});

module.exports = router;