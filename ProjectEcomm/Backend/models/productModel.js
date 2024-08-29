const mongoose = require('mongoose');
const productModel = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});
module.exports = mongoose.model('Product', productModel);
