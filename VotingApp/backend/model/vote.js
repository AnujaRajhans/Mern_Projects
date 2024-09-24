const mongoose = require('mongoose');
const voteSchema = new mongoose.Schema({
    voterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    electionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Election' },
    candidateId: { type: mongoose.Schema.Types.ObjectId, required: true,ref: 'Candidate' }
});
module.exports = mongoose.model('Vote', voteSchema);
