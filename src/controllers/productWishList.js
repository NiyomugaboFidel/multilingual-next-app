import ProductWishList from "../database/models/productwishlist.js";
import Product from "../database/models/product.js";
import { createAwish } from "../services/addToWishList.js";
import User from '../database/models/user.js'
import { sendEmailService } from "../services/sendEmail.service.js";
import sequelize from "../database/config/sequelize.js";
import { io } from "../events/events.js";
import Notifications from "../database/models/notification.js";

const addWishList = async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user.id;
  
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
  
      const wishes = await ProductWishList.findOne({
        where: { productId, userId },
      });
  
      if (wishes) {
        await wishes.destroy();
        return res.status(200).json({ message: "Product unwished successfully!" });
      }
  
      if (req.user.role === "buyer" || req.user.role === "admin") {
        const wishedItem = { userId, productId };
        await createAwish(wishedItem);
  
        const wish = await ProductWishList.findOne({
          where: { productId, userId },
        });
  
        const wishProduct = await Product.findOne({ where: { id: productId } });
        const seller = await User.findOne({ where: { id: wishProduct.sellerId } });
  
        // // Function to extract the URL from the JSON string
        // const extractUrl = (data) => {
        //   try {
        //     const parsed = JSON.parse(data);
        //     return parsed.url;
        //   } catch (e) {
        //     console.error('Error parsing URL from data:', e);
        //     return '';
        //   }
        // };
  
        // // Extract the URL of the first image
        // const imageUrl = wishProduct.images.length > 0 ? extractUrl(wishProduct.images[0]) : '';
  
        const sellerEmail = seller.email;
        const sellerName = seller.lastName;
        const subject = 'Products Wishlist';
        const message = `Hi ${sellerName}, you have a new wish from ${req.user.email}.`;
        const htmlContent = `
          <div class="product">
            <div class="product-details">
              <img src="${wishProduct.images[0]}" alt="Product Image">
              <div class="product-info">
                <h3>${wishProduct.name}</h3>
                <p>${wishProduct.price}</p>
                <p>Quantity: ${wishProduct.quantity}</p>
              </div>
            </div>
            <p>${message}</p>
          </div>
        `;
  
        const userEmail = req.user.email;
        const userName = req.user.lastName;
        const message2 = `Hi ${userName}, you have added a new wish for ${wishProduct.name}.`;
  
        const htmlContent2 = `
          <div class="product">
            <div class="product-details">
              <img src="${wishProduct.images[0]}" alt="Product Image">
              <div class="product-info">
                <h3>${wishProduct.name}</h3>
                <p>${wishProduct.price}</p>
              </div>
            </div>
            <p>${message2}</p>
          </div>
        `;
  
        const notificationDetails = {
          receiver: wishProduct.sellerId,
          subject,
          message,
          entityId: { productWishId: wish.id },
          productImage: wishProduct.images[0],
          receiverId:wishProduct.sellerId,
      };

      io.emit('wish-notification', notificationDetails);
        await Promise.all([
          await Notifications.create(notificationDetails),
          sendEmailService(sellerEmail, sellerName, subject, htmlContent),
          sendEmailService(userEmail, userName, subject, htmlContent2)
        ]);
  
        return res.status(201).json({
          message: "Product wished created successfully",
          wishedItemCreate: wish,
        });
      } else {
        return res.status(200).json({ message: "Only buyers are allowed!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message: "Something went wrong!",
        error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
      });
    }
  };
  
  const getWishedProducts = async(req, res) => {
    try {
        const sellerId = req.user.id;
        let products = [];

        if (req.user.role === "buyer" || req.user.role === "admin") {
            const wishes = await ProductWishList.findAll({
                where: { userId: sellerId }
            });

            // Using Promise.all to fetch all products in parallel
            const productPromises = wishes.map(async (wish) => {
                const product = await Product.findOne({ where: { id: wish.productId } });
                return product;
            });

            products = await Promise.all(productPromises);
        }else{
          return res.status(403).json({ message: 'Forbidden' });
        }


        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
        });
    }
}

const getWishedPerProduct = async (req, res) => {
  try {
      const sellerId = req.user.id;
      const productId = req.params.id;
      
      // Check if productId is provided
      if (!productId) {
          return res.status(400).json({
              success: false,
              message: "Product ID is required!",
          });
      }

      // Find the wishlist entry for the specific product
      const wish = await ProductWishList.findOne({
          where: {productId }
      });

      // If no wishlist entry is found
      if (!wish) {
          return res.status(404).json({
              success: false,
              message: "Product wish not found!",
          });
      }

      // Find the product details
      const product = await Product.findOne({ where: { id: wish.productId } });

      // If no product is found
      if (!product) {
          return res.status(404).json({
              success: false,
              message: "Product not found!",
          });
      }

      // Return the product details
      return res.status(200).json({
          success: true,
          product,
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: "Something went wrong!",
          error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
      });
  }
};



  export {addWishList, getWishedProducts, getWishedPerProduct}