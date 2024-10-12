import express from "express";
import {
  createNewProduct,
  retrieveItems,
  getAllProducts,
  getaProduct,
  productIsAvailable,
  searchProducts,
  deleteProduct,
  uploadImages,
  getProductsNearingExpiry,
  updateProduct,
  averageRating,
  getProduct,
} from "../../controllers/product.controllers";

import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import isSeller from "../../middlewares/seller.Middleware";
import { productImageResize, uploadPhoto } from "../../middlewares/uploadImage";
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["seller"]),
  createNewProduct
);

router.put(
  "/upload/:id",
  authMiddleware,
  checkRole(["buyer","seller"]),
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);
router.post(
  "/:id/rating",
  authMiddleware,
  checkRole(["seller", "buyer"]),
  averageRating
);

router.get(
  "/get-items",
  authMiddleware,
  checkRole(["buyer","seller"]),
  retrieveItems
);
router.get("/",getAllProducts);
router.get(
  "/item/:id",
  authMiddleware,
  checkRole(["buyer", "seller"]),
  getaProduct
);
router.get(
  "/product/:id",
  getProduct
);

router.put(
  "/isavailable/:id",
  authMiddleware,
  checkRole(["seller"]),
  productIsAvailable
);
router.put(
  "/update/:id",
  authMiddleware,
  checkRole(["seller"]),
  updateProduct
);

router.get(
  "/search",
  searchProducts
);

router.delete(
  "/delete/:id",
  authMiddleware,
  checkRole(["seller"]),
  deleteProduct
);
router.put(
  "/upload/:id",
  authMiddleware,
  checkRole(["buyer","admin", "seller"]),
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);

router.get(
  "/near-exp",
  authMiddleware,
  checkRole(["admin", "seller"]),
  getProductsNearingExpiry
);
export default router;
