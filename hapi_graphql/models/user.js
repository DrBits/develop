const mongoose = require('mongoose');

const userScema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

module.expors = mongoose.model('User', userSchema);
