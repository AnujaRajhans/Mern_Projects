const Election = require('../models/Election');

exports.createElection = async (req, res) => {
    const { title, description, candidates, startDate, endDate } = req.body;

    try {
        const election = await Election.create({ title, description, candidates, startDate, endDate });
        res.status(201).json(election);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getElections = async (req, res) => {
    const elections = await Election.find();
    res.json(elections);
};