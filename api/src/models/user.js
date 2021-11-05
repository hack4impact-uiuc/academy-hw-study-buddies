/**
 * Schema representing a H4I member
 */
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  classes: {
    type: [String],
  },
});

module.exports = mongoose.model('User', User);
