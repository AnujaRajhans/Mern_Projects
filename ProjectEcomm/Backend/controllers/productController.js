const mongoose = require('mongoose');
const productModel = require('../models/productModel');
const categoryModel= require('../models/categoryModel');
const { updateCategory } = require('./categoryController');
async function addProduct(req,res){
    console.log(req.body);
    const {name,price,availability,quantity,category,createdBy}=req.body;
    try{
        const existingCategory = await categoryModel.findById(category);
        if(!existingCategory){
            return res.status(404).json({message: 'Category not found'});
        }
        const existingProduct = await productModel.findOne({name,category});
        if(existingProduct){
            return res.status(409).json({message: 'Product already exists'});
        }
        const product = new productModel({
            name,
            price,
            availability,
            quantity,
            category,
            createdBy
        });
        await product.save();
        res.status(201).json({message: 'Product created successfully'});
    }
    catch(error){
        console.error(error);
        res.status(400).json({message: error.message});
    }
}
async function deleteproduct(req, res) {
    console.log(req.body);
    const { id } = req.params;
  
    try {
      const product = await productModel.findByIdAndDelete(id);
      console.log(id);
      if (!product) {
        return res.status(404).send({ msg: "Product not found" });
      }
  
      res.status(201).send({ msg: "Product Deleted Sucessfully" });
    } catch (error) {
      res.status(500).send("Server Error", error);
    }
  }
async function updateProduct(req, res) {
    console.log(req.body);
    const { name, category, price, available, quantity } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid product ID" });
    }
    try {
      const product = await productModel.findById(id);
      console.log(id);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      product.name = name || product.name;
      product.category = category || product.category;
      product.price = price || product.price;
      product.available = available || product.available;
      product.quantity = quantity || product.quantity;
      await product.save();
      res.json({ msg: "Product updated successfully", product });
    } catch (error) {
      res.status(500).send("Server Error", error);
    }
  }
async function getProductId(req,res) {
    console.log(req.body);
    const {id}= req.params;
    try{
        const product = await productModel.findById(id);
        console.log(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(201).send({message: "this product",product});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}
async function getAllProducts(req, res){
  console.log(req.body);
  try{
    const products = await productModel.find();
    res.status(200).json({products});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message: "Server error"});
  }
}


module.exports = {addProduct,
    deleteproduct,
    updateProduct,
    getAllProducts,
    getProductId
}