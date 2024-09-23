const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: String,
    description: String
});

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    candidates: [candidateSchema],
    startDate: { type: Date },
    endDate: { type: Date }
});

module.exports = mongoose.model('Election', electionSchema);