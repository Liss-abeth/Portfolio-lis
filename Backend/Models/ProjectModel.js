const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  tech: { type: String, required: true },
  live: { type: String },
  github: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
