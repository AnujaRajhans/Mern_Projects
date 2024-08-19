const mongoose = require('mongoose');
const categoryModel= mongoose.Schema({
    categoryName : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    createdBy : {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('Category', categoryModel);