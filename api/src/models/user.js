/**
 * Schema representing a H4I member
 */
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  memberDbId: {
    type: String,
    default: null,
  },
  classes: {
    type: [String],
    default: null,
  },
});

module.exports = mongoose.model('User', User);
