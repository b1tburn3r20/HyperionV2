const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updatePostSchema = new Schema({
  content: { 
    type: String,
    required: true
  },
  hashtag: {
    type: String,
    enum: [
      "augmented reality", "jobs", "leetcode", 
      "webdev", "piano", "ideas", "coding", "anything else"
    ],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }
});

module.exports = mongoose.model('UpdatePost', updatePostSchema);
