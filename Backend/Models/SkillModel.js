const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  level: { type: Number, default: 50 }, // optional, for radar chart
});

module.exports = mongoose.model('Skill', skillSchema);
