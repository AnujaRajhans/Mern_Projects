// const mongoose = require('mongoose');
// const categoryModel= mongoose.Schema({
//     categoryName : {
//         type: String,
//         required: true
//     },
//     createdAt : {
//         type: Date,
//         default: Date.now
//     },
//     createdBy : {
//         type : String,
//         required: true
//     }
// })
// module.exports = mongoose.model('Category', categoryModel);

const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Category', categoryModel);
