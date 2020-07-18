const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    min: [6, 'Password must be at least 6 characters'],
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'What are we going to call you?']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
