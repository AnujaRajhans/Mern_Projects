const mongoose = require("mongoose");
const invitemodel = require("../module/Invite");
const taskmodel = require("../module/Task");
async function invitation(req, res) {
  console.log(req.body);
  const userid = req.user._id;
  const { task, invitedUser, status, invitedAt } = req.body;
  const validStatuses = ["Not started", "In progress", "Completed"];
  if (!validStatuses.includes(status)) {
    return res
      .status(400)
      .send({ msg: "Invalid status value", success: false });
  }
  try {
    const existingTask = await taskmodel.findById(task);
    if (!existingTask) {
      return res.status(404).send({ msg: "Task not found", success: false });
    }
    const invite = await invitemodel.findOne({
      task,
      invitedUser,
    });
    if (invite) {
      return res
        .status(400)
        .send({ msg: "Invite already exists", success: false });
    }
    const newInvite = new invitemodel({
      task,
      invitedUser,
      status,
      invitedAt: Date.now(),
    });
    await newInvite.save();
    res.status(201).send({ msg: "Invited successfully", success: true });
  } catch (error) {
    console.error("Error creating invite:", error);
    res.status(500).send({ error: "Server Error", success: false });
  }
}

module.exports = {
  invitation,
};