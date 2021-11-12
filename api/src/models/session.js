const mongoose = require('mongoose');

const Session = new mongoose.Schema({
  creator: { type: String, default: null, required: true },
  class: { type: String, default: null, required: true },
  location: { type: String, default: null, required: true },
  attendees: { type: [String], default: null },
<<<<<<< HEAD
  groupSize: { type: Number, default: 0 },
  notes: { type: String, default: null },
  active: { type: Boolean, default: false, required: true },
  startTime: { type: Number, default: Date.now() / 1000, required: true },
  timeout: { type: Number, default: 43200 }, // length of timeout in milliseconds, 12 hours
=======
  notes: { type: String, default: null },
  active: { type: Boolean, default: false, required: true },
  startTime: { type: Number, default: Date.now() / 1000, required: true },
  timeout: { type: Number, default: 43200 }, // length of timeout in seconds, 12 hours
>>>>>>> d239ffac97e522b2ef4519a55e3695e55395b480
});

module.exports = mongoose.model('Session', Session);
