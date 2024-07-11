import Product from "../database/models/product";
import { createProduct, findAllProduct } from "../services/product.service";
import slugify from "slugify";

const createNewProduct = async(req, res)=>{
    console.log(req.body);
    try {
        
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct  = await createProduct(req.body);
        newProduct.sellerId = req.user.id
        await newProduct.save();
        res.status(201).json({success:true, message:'Product created successful',newProduct});
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({success:false, message:'Something went wrong'});

    }
}
const getAllProducts = async(req, res)=>{
    try { 
        const newProduct  = await findAllProduct()
        res.status(200).json({success:true, message:'All products',newProduct});
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({success:false, message:'Something went wrong'});

    }
}

export {
    createNewProduct,
    getAllProducts
}