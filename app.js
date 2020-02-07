const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const blogs = require('./routes/api/blogs');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/hello_world', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/blogs', blogs);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));