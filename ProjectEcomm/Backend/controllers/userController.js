const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
async function register(req, res) {
  console.log(req.body);
  const { name, email, password, mobile_number, role } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      const newUser = new userModel({
        name,
        email,
        password,
        mobile_number,
        role,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(400).json("User already exists");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}


async function login(req, res) {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: "Invalid Email or Password" });
    }
    const token = jwt.sign({ _id: user._id }, "key", { expiresIn: "1h" });
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  register,
  login,
};