import express from "express";
import {
  createNewProduct,
  retrieveItems,
  getAllProducts,
  getaProduct,
  productIsAvailable,
  searchProducts,
  uploadImages,
  getProductsNearingExpiry,
  updateProduct,
  averageRating,
  deleteImage,
} from "../../controllers/product.controllers";

import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { productImageResize, uploadPhoto } from "../../middlewares/uploadImage";
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["seller","admin"]),
  createNewProduct
);

router.put(
  "/upload/:id",
  authMiddleware,
  checkRole(["admin","seller"]),
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);
router.delete("/:id/images/:imageId", deleteImage);
router.post(
  "/:id/rating",
  authMiddleware,
  checkRole(["admin","seller", "buyer"]),
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
  checkRole(["buyer", "admin", "seller"]),
  getaProduct
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
