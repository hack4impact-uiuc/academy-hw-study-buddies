const mongoose = require('mongoose');

const Session = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  class: { type: String, default: null, required: true },
  location: { type: String, default: null, required: true },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  notes: { type: String, default: null },
  active: { type: Boolean, default: false, required: true },
  startTime: { type: Number, default: Date.now() / 1000, required: true },
  timeout: { type: Number, default: 43200 }, // length of timeout in seconds, 12 hours
});

module.exports = mongoose.model('Session', Session);
