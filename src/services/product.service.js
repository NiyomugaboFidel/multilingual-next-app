import Product from "../database/models/product";

const createProduct = async(productDetails)=>{
    const newProduct = await Product.create(productDetails);
    if(!newProduct){
        console.error('Failed create Product ')
        return false
    }
    return newProduct
}

// find Product by Id
const findProductById = async(id)=>{
    const Product  = await Product.findOne({where:{id}});
    if(Product == null){
     console.log('findProductById return "null"');  
     return false
    }else{
       return Product
    }
   }
   // find Product by Id
   const findAllProduct= async()=>{
    const Products = await Product.findAll({
       order:[
           ['createdAt','DESC']
       ]
    });
    if(Products == null){
     console.log('findAll Products return "null"');  
     return false
    }else{
       return Products
    }
   }
export {findAllProduct,findProductById ,createProduct}