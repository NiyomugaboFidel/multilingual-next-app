import Cart from '../database/models/cart'
import Product from '../database/models/cart'
import { findProductById } from '../services/product.service';

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

export {
    AddToCart,
}