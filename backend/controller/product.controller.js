
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async(req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("error in fetching products: ", error.message);
        
        res.status(500).json({success: false, message: "Sever Error"})
    }
}

export const createProduct = async(req, res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }
    const newPorduct= new Product(product)
    try{
        await newPorduct.save();
        res.status(200).json({success: true, message: "Product created successfull", data: newPorduct})
    }catch(error){
        console.log("Error in create product: ", error.message);
        
        res.status(440).json({success: false, message: "product not create"})
    }
}
export const deleteProduct= async (req, res)=>{
    const {id}= req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Id"})
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfull"})
    } catch (error) {
        console.log("error in delete a product");
        
        res.status(500).json({success: false, message: "Product not found"})
    }
}
export const updateProduct= async (req, res)=>{
    const {id}=req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Id"})
    }
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }

    try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {new: true})
    res.status(200).json({success: true, data: updateProduct, message: "update completed"})
    } catch (error) {
        console.log("Error in Update product");
        
        res.status(500).json({success: false, message: "Error in Update product"})
    }
}