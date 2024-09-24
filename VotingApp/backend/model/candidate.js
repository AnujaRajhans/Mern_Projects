const mongoose = require('mongoose');
const candidateSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    education: { type: String, required: true },
    party: { type: String, required: true},
})
module.exports = mongoose.model("candidate", candidateSchema)