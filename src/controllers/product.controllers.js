import { Op, where } from "sequelize";
import Product from "../database/models/product";
import {
  createProduct,
  findAllProduct,
  findProduct,
  getPagenation,
} from "../services/product.service";
import slugify from "slugify";
import cloudinaryUploadImg from "../utils/cloudinary";
import fs from "fs";
import { verifyId } from "../validation/isValidateId";

const createNewProduct = async (req, res) => {
  const { name, price,brand, quantity, bonus, expiryDate, categoryId, description } = req.body;

  try {

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const productDetails = {
      title:req.body.title,
      slug:req.body.slug,
      name,
      description,
      price,
      quantity,
      bonus,
      expiryDate,
      categoryId,
      brand
    };
  
    const newProduct = await createProduct(productDetails);
    newProduct.sellerId = req.user.id;
    await newProduct.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Product created successful",
        newProduct,
      });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const retrievItems = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Failed to retrievItem , please login again ",
        });
    }

    // get query parameter
    const size = parseInt(req.query.size, 10) || 10;
    const page = parseInt(req.query.page, 10) || 0;

    // get pagenations
    const { limit, offset } = getPagenation(page, size);

    // seller retrievItems
    if (user.role === "seller") {
      const items = await Product.findAndCountAll({
        where: {
          sellerId: user.id,
        },
        limit,
        offset,
      });
      //check if items not equer to "null"
      if (!items) {
       return res
          .status(400)
          .json({ success: false, message: "No products found in store" });
      }
      if (items.rows.length === 0) {
        return res.status(200).json({ message: "The collection is empty" });
      }

     return  res.status(200).json({ success: true, message: "All products", items });
    }
    // admin retrievItems
    const items = await Product.findAndCountAll({
      limit,
      offset,
    });

    //check if items not equer to "null"
    if (!items) {
     return res
        .status(400)
        .json({ success: false, message: "No products found in store" });
    }
    if (items.rows.length === 0) {
      return res.status(200).json({ message: "The collection is empty" });
    }
   return res
      .status(200)
      .json({ success: true, message: "All products", items: items.rows });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// getAllProducts
// ================================
const getAllProducts = async (req, res) => {
  try {
    // get query parameter
    const size = parseInt(req.query.size, 10) || 10;
    const page = parseInt(req.query.page, 10) || 0;

    // get pagenations
    const { limit, offset } = getPagenation(page, size);

    const allProducts = await Product.findAndCountAll({
      limit,
      offset,
    });
    //check if items not equer to "null"
    if (!allProducts) {
      return res
        .status(400)
        .json({ success: false, message: "No products found in store" });
    }
    if (allProducts.rows.length === 0) {
      return res.status(200).json({ message: "The collection is empty" });
    }
   return res
      .status(200)
      .json({ success: true, message: "All products", allProducts });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// get product as Seller
// +++++++++++++++++++++++++++++++
// =================================
const getaProduct = async (req, res) => {
  const productId = req.params.id;

    try {
      const validId = verifyId(productId)
      if(!validId){
        return res.status(404).json({ message: 'invaled id' });

      }
      const sellerId = req.user.id;
      const role = req.user.role;
      const product = await findProduct(productId, sellerId, role);
      
      if (!product) {
        // If no product is found, send a 404 response
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Send the product data
      res.json(product);
    } catch (error) {
      // Log the error and send a 500 response
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
// update Products
// =============================
const updateProduct = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// ssearch products
// =========================================
const searchProducts = async (req, res) => {
  console.log(req.query);
  const {bestBefore,maxPrice,minPrice,categoryId,name,brand} = req.query
  try {

    const where = {};
    if(name) where.name = {[Op.iLike]: `%${name}%`};
    if(brand) where.brand = {[Op.iLike]: `%${brand}%`}
    if(minPrice) where.price = {[Op.gte]: minPrice};
    if(maxPrice) where.price = {...where.price ,[Op.lte]: maxPrice};
    if(categoryId){
      const validId = verifyId(categoryId)
      if(!validId){
        return res.status(404).json({ message: 'Inval Category' });
  
      }
      where.categoryId = categoryId;
    } 

    let expiryDate;

    if(bestBefore){
      expiryDate = new Date(bestBefore);

      if(isNaN(expiryDate)){
        return res.status(400).json({ error: 'Invalid date format for bestBefore' }); 
      }
        console.log('expiryDate in equery',expiryDate);
      where.expiryDate = {[Op.lt]: expiryDate}
      console.log(where);
    } 

    const products = await Product.findAll({where});

    res.status(200).json({products});

  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Example function to find and display products nearing expiry
async function getProductsNearingExpiry() {
  const currentDate = new Date();
  const nearExpiryDate = new Date();
  nearExpiryDate.setMonth(currentDate.getMonth() + 1); // Products expiring within the next month

  const products = await Product.findAll({
    where: {
      expiryDate: {
        [Op.lte]: nearExpiryDate, // Sequelize operator to find dates less than or equal to nearExpiryDate
      },
    },
  });

  return products;
}

// delete a product as seller and owmer of product
// =======================================================

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const sellerId = req.user.id;
    if (!sellerId) {
     return res
        .status(401)
        .json({
          success: false,
          message: "UnAuthorized, Login again token Expiered",
        });
    }

    const item = await Product.findOne({ where: { id: productId } });
    if (!item) {
    return  res.status(400).json({ success: false, message: "product not found" });
    }

    const product = await Product.findOne({
      where: {
        id: productId,
        sellerId: sellerId,
      },
    });
    if (!product) {
     return res.status(401).json({ success: false, message: "product not found" });
    } else {
      await product.destroy();
    }
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successful", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// upload image of product
const uploadImages = async (req, res) => {
  const id = req.params.id;
  try {
    const validId = verifyId(id)
    if (!id || !validId) {
      return res
        .status(400)
        .json({ success: false, message: "Id is not found in params" });
    }
    const product = await Product.findOne({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    console
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log({ newpath });
      urls.push(newpath);
      fs.unlinkSync(path);
    }

    const findproduct = await Product.update(
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        where: { id: id },
      }
    );
    await product.save();
    res
      .status(200)
      .json({ success: true, message: "Product uploaded succesful" });
  } catch (error) {
    throw new Error(error);
  }
};

export {
  createNewProduct,
  getAllProducts,
  getaProduct,
  deleteProduct,
  retrievItems,
  uploadImages,
  searchProducts,
  getProductsNearingExpiry,
};
