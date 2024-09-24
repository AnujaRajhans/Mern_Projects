const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  candidate: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Candidate',   
    required: true 
  }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model('Election', electionSchema);
