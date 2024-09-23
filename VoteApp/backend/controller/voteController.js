const Vote = require('../models/Vote');
const Election = require('../models/Election');

exports.castVote = async (req, res) => {
    const { electionId, candidateId } = req.body;
    const voterId = req.user.id;

    try {
        // Check if user already voted
        const existingVote = await Vote.findOne({ voterId, electionId });
        if (existingVote) return res.status(400).json({ error: 'You can only vote once' });

        const vote = await Vote.create({ voterId, electionId, candidateId });
        res.status(201).json(vote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};