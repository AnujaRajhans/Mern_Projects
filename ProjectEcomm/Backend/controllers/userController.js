const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
async function register(req, res) {
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
            res.status(201).json({ message: "User registered successfully", success: true });
        } else {
            res.status(400).json({ error: "User already exists", success: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user || !(await user.comparepassword(password))) {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });
        res.status(200).json({ user, token: token, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

async function userInfo(req, res) {
    const id = req.user._id;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            res.status(404).json({ msg: "User not found", success: false });
        } else {
            res.status(200).json({ user, success: true });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = {
    register,
    login,
    userInfo,
};
