import ProductWishList from "../database/models/productwishlist";


const createAwish=async(wishes)=>{
    await ProductWishList.create(wishes)
};
export {createAwish}