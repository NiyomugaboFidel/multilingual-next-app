import { where } from "sequelize";
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
const findProduct = async(id,sellerId,role)=>{
    if(role === 'seller'){
        const product = await Product.findOne({
            where:{
                id:id,
                sellerId:sellerId
            }
        });
       console.log(product);
        if(product == null){
            return false
        }else{
            return product
        }
    }

    if(role === 'admin'){
        const product = await Product.findOne({
            where:{
                id:id,
            },
        });
       console.log(product);
        if(product == null){
            return false
        }else{
            return product
        }
    }
    
        const product = await Product.findOne({
            where:{
                id:id,
            }
        });
       console.log(product);
        if(product == null){
            return false
        }else{
            return product
        }
    }
 
    const findProductById = async (id) => {
        return await Product.findByPk(id);
      };
   
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

   const getPagenation =(page,size)=>{
    const limit = size >= 0 ? size : 0
    const offset = page >= 0 ? page * limit : 10
    return {limit,offset}
   }
export {findAllProduct, createProduct,findProduct,getPagenation, findProductById}