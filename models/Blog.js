const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    maxlength: 2000,
    required: true
  },
  author: {
    type: String,
    required: false
  },
  description: {
    type: String
  },
  published_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);