const categoryModel= require("../models/categoryModel");

async function addCategory(req,res){
    console.log(req.body);
    const {categoryName,createdBy}= req.body;
    try{
        const existingCategory= await categoryModel.findOne({categoryName});
        if(existingCategory){
            return res.status(400).json({message: "Category already exists"});
        }
        else{
            const newCategory= new categoryModel({categoryName,createdBy});
            await newCategory.save();
            return res.status(201).json({message: "Category added successfully"});
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
}

    async function getCategory(req, res){
        console.log(req.body);
        try{
            const categories= await categoryModel.find({});
            return res.status(200).json(categories);
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error"});
        }
    }

    async function deleteCategory(req, res){
        console.log(req.body);
        const {id}= req.params;
        try{
            const deletedCategory= await categoryModel.findByIdAndDelete(id);
            if(!deletedCategory){
                return res.status(404).json({message: "Category not found"});
            }
            else{
                return res.status(200).json({message: "Category deleted successfully"});
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error"});
        }
    }
    
    async function updateCategory(req, res){
        console.log(req.body);
        const {id}= req.params;
        const {categoryName,updatedBy}= req.body;
        try{
            const updatedCategory= await categoryModel.findByIdAndUpdate(id,{categoryName,updatedBy},{new: true});
            if(!updatedCategory){
                return res.status(404).json({message: "Category not found"});
            }
            else{
                return res.status(200).json({message: "Category updated successfully",updatedCategory});
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error"});
        }
    }

module.exports={addCategory,
    getCategory,
    deleteCategory,
    updateCategory
};