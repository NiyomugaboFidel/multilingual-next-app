import Cart from '../database/models/cart'
import Product from '../database/models/cart'
import { findProductById } from '../services/product.service';


const updateCart = async (fields, cartId) => {
    return Cart.update({ ...fields }, { where: { id: cartId } });
  };

  const createCart = (cart) => {
    return Cart.create(cart);
  };
  
  const getCart = async (userId) => {
    return Cart.findOne({ where: { userId: userId } });
  };
  
const getCartProducts= async(products)=>{
    return Promise.all(
        products.map(async(product)=>{
            return findProductById(product);
        })
    );
};
export {
    updateCart,
    createCart,
    getCart,
    getCartProducts
}  