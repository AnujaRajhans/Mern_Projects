// const VoteModel = require("../model/vote");
// const Election = require ("../model/election");
// async function AddVote(req, res) {
//   const { voterId,electionId, candidateId } = req.body;
//   const id =(req.user._id)
//   try {
//     const Vote = new VoteModel({
//         voterId,
//         electionId,
//         candidateId,
//     });
//     await Vote.save();
//     console.log(Vote);
//     return res.status(201).send({
//       Vote: Vote,
//       Message: "User has Voted",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ Message: error.message, success: false });
//   }
// }

const VoteModel = require("../model/vote");
const Election = require("../model/election");

async function AddVote(req, res) {
  const { voterId, electionId, candidateId } = req.body;

  try {
    // Use req.user._id instead of req.user being undefined
    const vote = new VoteModel({
      voterId: req.user._id,  // Assuming voterId is the authenticated user's ID
      electionId,
      candidateId,
    });

    await vote.save(); // Save the vote
    console.log(vote);

    return res.status(201).send({
      vote: vote,
      message: "User has voted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message, success: false });
  }
}

module.exports = { AddVote };


async function GetAllVote(req, res) {
  try {
    const vote = await VoteModel.find();
    if (!vote) {
     return res.status(400).send({ message: "There is no votes " });
    }
    return res.status(200).send(vote);
  } catch (error) {
    res.status(500).send({ error });
  }
}

module.exports = {
  AddVote,
  GetAllVote,
};
