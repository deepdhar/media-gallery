const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Media', mediaSchema);