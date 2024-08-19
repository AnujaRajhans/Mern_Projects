const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }
})
userModel.pre('save', async function(next){
    const user=  this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})
userModel.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);

}


module.exports = mongoose.model('User', userModel);