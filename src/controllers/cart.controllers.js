import Cart from '../database/models/cart'
import Product from '../database/models/cart'
import { getCartProducts, updateCart } from '../services/cart.service';
import { findProductById } from '../services/product.service';
import calculateProductTotalPrice from '../utils/cart';

const AddToCart = async(req, res)=>{

    try {
        let cart = req.cart;
        const userId = req.user.id;
        const {productId} = req.body
        const productQuantity = req.body.productQuantity

        const product = await findProductById(productId);
        if(!product){
            return res.status(400).json({ message: "Product does'nt exist" });
        }

        if(product.quantity < productQuantity ){
            return res
            .status(400)
            .json({ message: 'No enough product in the stock' });
        }
        if(!cart){
            const products =[{
                quantity:productQuantity,
                productId:productId,
                sellerId:product.sellerId,
            }]

            const newCarts = {
                products,
                userId
               }
        const addedCart = await Cart.create(newCarts);

         
        }
    
  
        return res.status(201).json({
          id: productId,
          sellerId: product.sellerId,
          quantity: productQuantity,
          message: 'Product added to cart successfully ',
        });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const viewCart = async(req, res)=>{
    try {
        const cart = req.cart
         if(!cart){
            return res
            .status(404)
            .json({ message: 'Your cart is empty, Create a new cart' });  
         }
         const {products} = cart
         const productId = products.map((p)=> p.productId);
         const productInfo = await getCartProducts(productId);
         
         const productAllInfo = productInfo.map((product, index)=>({
            id: product.id,
            name:product.name,
            price:product.price,
            quantity:products[index].quantity,
            images:product.images,
            sellerId:product.sellerId
         }));
        const totalPrice = calculateProductTotalPrice(productAllInfo);
         return res.status(200).json({
            id: cart.id,
            totalPrice,
            product: productAllInfo,
           message:'viewCart successful'
          });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const clearCart = async(req, res)=>{
    const cart = req.cart
    try {
     cart.products = [];
     await updateCart({products: cart.products}, cart.id);
     return res
      .status(200)
      .json({ id: cart.id, message: 'cart is successfully cleared' });   
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const removeFromCart = async(req, res)=>{
    const productId = req.params.productId
    const cart = req.cart
    try {
        const productToRemove = cart.products.findIndex((p) => p.productId === productId);
        cart.products.splice(productToRemove, 1)
        await updateCart({productId:cart.products}, cart.id);
        return res.status(200).json({
            id: cart.id,
            message: 'Item removed from cart successfully',
          });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export {
    AddToCart,
    removeFromCart,
    clearCart,
    viewCart
}