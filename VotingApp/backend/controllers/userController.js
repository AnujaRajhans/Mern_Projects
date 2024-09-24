const mongoose = require("mongoose");
const usermodel = require("../model/user");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  console.log(req.body);
  const {
    name,
    email,
    password,
    reEnterPassword,
    profileImage,
    createdAt,
    dateOfBirth,
    mobileNo,
    aadhar,
  } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      const image = req.file ? req.file.filename : null;
      const newUser = new usermodel({
        name,
        email,
        password,
        reEnterPassword,        
        profileImage: image,
        createdAt: Date.now(),
        dateOfBirth,
        mobileNo,
        aadhar,
      });
      await newUser.save();
      res.status(201).send({ message: "User registered successfully", success: true });
    } else {
      res.status(400).send({ error: "User already exists", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
}

async function login(req, res) {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, "key", { expiresIn: "1h" });
    res.status(200).send({ user, access: token, success: true });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
}

// User info function
async function userinfo(req, res) {
  console.log("****", req.user);
  const id = req.user._id;
  try {
    const user = await usermodel.findById(id);
    console.log(user);
    if (!user) {
      res.status(404).send({ msg: "User not found", success: false });
    } else {
      res.status(200).send({ user, success: true });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
}

module.exports = {
  register,
  login,
  userinfo,
};
