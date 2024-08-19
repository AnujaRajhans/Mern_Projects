const mongoose = require('mongoose');
const productModel = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    availability:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    category:{
        type : mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    createdBy:{
        type: String,
        required: true
    }
    
})

module.exports= mongoose.model('Product', productModel);