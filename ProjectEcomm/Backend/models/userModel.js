const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile_number: { type: String },
    role: { type: String, default: 'user' },
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
userSchema.methods.comparepassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);
