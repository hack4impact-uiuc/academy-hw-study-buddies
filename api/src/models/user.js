/**
 * Schema representing a H4I member
 */
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
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
