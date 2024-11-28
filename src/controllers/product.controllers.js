import { Op, where } from "sequelize";
import Product from "../database/models/product";
import {
  findAllProduct,
  findProduct,
  getPagenation,
} from "../services/product.service";
import slugify from "slugify";
import cloudinaryUploadImg from "../utils/cloudinary";
import fs from "fs";
import { verifyId } from "../validation/isValidateId";
import sequelize from '../database/config/sequelize.js';
import ProductImage from "../database/models/productimages.js";
import ProductSpecification from "../database/models/productspecifications.js";
import ProductVariation from "../database/models/productvariation.js";
import RelatedProduct from "../database/models/relatedproduct.js";

// const createNewProduct = async (req, res) => {
//   const { name, price, brand, quantity, bonus, expiryDate, categoryId, description } = req.body;

//   try {
//     if (req.body.title) {
//       req.body.slug = slugify(req.body.title);
//     }
//     const productDetails = {
//       title: req.body.title,
//       slug: req.body.slug,
//       name,
//       description,
//       price,
//       quantity,
//       bonus,
//       expiryDate,
//       categoryId,
//       brand,
//     };

//     const newProduct = await createProduct(productDetails);
//     newProduct.sellerId = req.user.id;
//     await newProduct.save();
//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       newProduct,
//     });
//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };




const createNewProduct = async (req, res) => {


  try {
    const productData = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id,
      brand: req.body.brand,
      price: req.body.price,
      discount: req.body.discount || 0,
      currency: req.body.currency,
      stock_availability: req.body.stock_availability || 'In Stock',
      stock_quantity: req.body.stock_quantity || 0,
      average_rating: req.body.average_rating || 0,
      review_count: req.body.review_count || 0,
      tags: req.body.tags || [],
      isAvailable: req.body.isAvailable || false,
      expiry_date: req.body.expiry_date,
      isExpired: req.body.isExpired || false,
      seller_id: req.body.seller_id,
      seller_name: req.body.seller_name,
      seller_rating: req.body.seller_rating,
      free_shipping: req.body.free_shipping || false,
      delivery_time: req.body.delivery_time,
      return_policy: req.body.return_policy,
    };

    const newProduct = await Product.create(productData);
    res.status(201).json({
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product', error });
  }
};

const retrieveItems = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Please log in again.",
      });
    }

    // Get query parameters
    const size = parseInt(req.query.size, 10) || 10;
    const page = parseInt(req.query.page, 10) || 0;

    // Get pagination
    const { limit, offset } = getPagenation(page, size);

    // Seller retrieving items
    if (user.role === "seller") {
      const items = await Product.findAndCountAll({
        where: { sellerId: user.id },
        limit,
        offset,
      });

      if (!items || items.rows.length === 0) {
        return res.status(200).json({ success: true, message: "No products found in store" });
      }

      return res.status(200).json({ success: true, message: "Products retrieved successfully", items });
    }

    // Admin retrieving items
    const items = await Product.findAndCountAll({
      limit,
      offset,
    });

    if (!items || items.rows.length === 0) {
      return res.status(200).json({ success: true, message: "No products found in store" });
    }

    return res.status(200).json({ success: true, message: "Products retrieved successfully", items: items.rows });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const size = parseInt(req.query.size, 10) || 10;
    const page = parseInt(req.query.page, 10) || 0;

    const { limit, offset } = getPagenation(page, size);

    const allProducts = await Product.findAndCountAll({where:{isAvailable:true}},{
      limit,
      offset,
    });

    if (!allProducts || allProducts.rows.length === 0) {
      return res.status(200).json({ success: true, message: "No products found in store" });
    }

    return res.status(200).json({ success: true, message: "Products retrieved successfully", allProducts });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getaProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const validId = verifyId(productId);
    if (!validId) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const sellerId = req.user.id;
    const role = req.user.role;
    const product = await findProduct(productId, sellerId, role);
  

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product retrieved successfully", product });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const validId = verifyId(productId);
    if (!validId) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }


    const product = await Product.findOne({where:{id:productId , isAvailable:true}});
  

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product retrieved successfully", product });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const productIsAvailable = async(req, res) => {
  const productId = req.params.id;
  const sellerId = req.user.id;
  try {
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is missing" });
    }
    if (!sellerId) {
      return res.status(401).json({ success: false, message: "seller ID is missing, Unauthorized" });
    }
    const product = await Product.findOne({where:{id:productId, sellerId:sellerId}})

    if(!product || product === null){
      return res.status(404).json({ success: false, message: "product not found" });
    }
        product.isAvailable = !product.isAvailable
        await product.save();
    res.status(200).json({ success: true, message: "Product availability changed successfully",isAvailable:product.isAvailable });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { name, price, brand, quantity, bonus, expiryDate, categoryId, description } = req.body;
  const productId = req.params.id;
  const sellerId = req.user.id;
  try {
   if(!productId){
    return res.status(400).json({ success: false, message: "Product ID is missing" });
   }
   const product = await Product.findOne({where:{id:productId, sellerId:sellerId}});
   if(!product || product === null){
    return res.status(404).json({ success: false, message: "product not found" });
  }
   
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const currentImage = product.images
    const updatedProductDetails = {
      title: req.body.title || product.title,
      slug: req.body.slug || product.slug,
      name:name || product.name,
      description: description || product.description,
      price :price ||product.price ,
      quantity:quantity||product.quantity,
      bonus:bonus ||product.bonus,
      expiryDate: expiryDate||product.expiryDate,
      categoryId: categoryId||product.categoryId,
      brand: brand||product.brand,
      images: currentImage,
    };
    const updatedProduct = await Product.update(
      updatedProductDetails,
      {
        where:
        {
          id:productId,
         sellerId
        }
      })
     const newProduct = await Product.findOne({where:{id:productId}}); 
    res.status(200).json({ success: true, message: "Product updated successfully", newProduct });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const searchProducts = async (req, res) => {
  console.log(req.query);
  const { bestBefore, maxPrice, minPrice, categoryId, name, brand } = req.query;
  try {
    const where = {isAvailable:true,};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (brand) where.brand = { [Op.iLike]: `%${brand}%` };
    if (minPrice) where.price = { [Op.gte]: minPrice };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice };
    if (categoryId) {
      const validId = verifyId(categoryId);
      if (!validId) {
        return res.status(400).json({ success: false, message: "Invalid category ID" });
      }
      where.categoryId = categoryId;
    }

    let expiryDate;
    if (bestBefore) {
      expiryDate = new Date(bestBefore);
      if (isNaN(expiryDate)) {
        return res.status(400).json({ success: false, message: "Invalid date format for bestBefore" });
      }
      where.expiryDate = { [Op.lt]: expiryDate };
    }

    const products = await Product.findAll({ where});

    res.status(200).json({ success: true, message: "Products retrieved successfully", products });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const  getProductsNearingExpiry =  async(req, res) =>{
  try {
    // Implement the update logic here
    const currentDate = new Date();
    const nearExpiryDate = new Date();
    nearExpiryDate.setMonth(currentDate.getMonth() + 1);
  
    const products = await Product.findAll({
      where: {
        expiryDate: {
          [Op.lte]: nearExpiryDate,
        },
      },
    });
  
    res.status(200).json({ success: true, message: "All Products  near expiryDate ", products });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const sellerId = req.user.id;
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in again.",
      });
    }

    const item = await Product.findOne({ where: { id: productId } });
    if (!item) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const product = await Product.findOne({
      where: { id: productId, sellerId: sellerId },
    });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    } else {
      await product.destroy();
      return res.status(200).json({ success: true, message: "Product deleted successfully", product });
    }
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const uploadImages = async (req, res) => {
  const id = req.params.id;

  try {
 
    const validId = verifyId(id);
    if (!id || !validId) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

   
    
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;


    for (const file of files) {
      const { path } = file;
      try {
        const newpath = await uploader(path); 
        urls.push(newpath); 
      } finally {
   
        fs.unlink(path, (err) => {
          if (err) console.error(`Failed to delete file: ${path}`, err);
        });
      }
    }


    // console.log("Uploaded URLs:", urls.map((url) => url.url));

    const productImageEntries = urls.map((url) => ({
      product_id: id,
      url: url.url,
      alt_text: `Image for product: ${product.title}` 
    }));

    await ProductImage.bulkCreate(productImageEntries);


    const productWithImages = await Product.findOne({
      where: { id },
      include: [
        {
          model: ProductImage,
          as: 'productimages', 
        },
      ],
    });


    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      product: productWithImages,
    });
  } catch (error) {
    console.error("Error in uploadImages:", error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const { uploader } = require("cloudinary").v2;

const cloudinaryDeleteImg = async (url) => {
  try {
    // Extract public_id from the URL
    const publicId = url.split("/").slice(-1)[0].split(".")[0];
    const result = await uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
};

const deleteImage = async (req, res) => {
  const { id, imageId } = req.params;

  try {
    const validProductId = verifyId(id);
    // const validImageId = verifyId(imageId);

    if (!id || !validProductId) {
      return res.status(400).json({ success: false, message: "Invalid ID(s)" });
    }

    const image = await ProductImage.findOne({ where: { id: imageId, product_id: id } });
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // Delete image from Cloudinary
    const cloudinaryResponse = await cloudinaryDeleteImg(image.url);

    // Remove image from the database
    await ProductImage.destroy({ where: { id: imageId } });

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      cloudinaryResponse,
    });
  } catch (error) {
    console.error("Error in deleteImage:", error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const averageRating = async (req, res) => {
  try {
    const productId = req.params.id;
    const sellerId = req.user.id; // assuming you have a middleware to attach user info to the request
    const { rating } = req.body;

    if (!productId || rating == null) {
      return res.status(400).json({
        message: 'Product ID and rating are required',
      });
    }

    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(400).json({
        message: 'Product not found',
      });
    }

    // Update ratings array
    const updatedRatings = [...product.ratings, rating];
    const totalRatings = updatedRatings.length;

    // Calculate average rating
    const sumRatings = updatedRatings.reduce((sum, r) => sum + r, 0);
    const averageRating = (sumRatings / totalRatings).toFixed(2);

    // Update the product
    await Product.update(
      {
        ratings: updatedRatings,
        averageRating,
      },
      {
        where: { id: productId },
      }
    );

    res.status(200).json({
      success: true,
      message: 'Rating updated successfully',
      averageRating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
};



export {
  createNewProduct,
  retrieveItems,
  getAllProducts,
  getaProduct,
  productIsAvailable,
  updateProduct,
  searchProducts,
  getProductsNearingExpiry,
  deleteProduct,
  uploadImages,
  deleteImage,
  averageRating
};
