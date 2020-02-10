const mongoose = require('mongoose');
const config = require('config');

const connectDB = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB is Connected...'))
  .catch(e => {
    console.error(err.message);
    process.exit(1);
  })
};

module.exports = connectDB;