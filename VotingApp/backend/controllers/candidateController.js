const Candidate = require("../model/candidate");
const addCandidate = async (req, res) => {
  try {
    const { name, age, party, education } = req.body;
    const candidate = new Candidate({
      name,
      age,
      party,
      education,
    });
    await candidate.save();
    return res
      .status(201)
      .send({ message: "Candidate created successfully", candidate });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error creating candidate", error: error.message });
  }
};

const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find(); 
        res.status(200).json(candidates);          
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

module.exports = {
  addCandidate,
  getAllCandidates,
};
