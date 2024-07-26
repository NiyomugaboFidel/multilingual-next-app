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
} from "../controllers/product.controllers";

import { authMiddleware, checkRole } from "../middlewares/authMiddleware";
import isSeller from "../middlewares/seller.Middleware";
import { productImageResize, uploadPhoto } from "../middlewares/uploadImage";
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["admin", "seller"]),
  createNewProduct
);
router.put(
  "/upload/:id",
  authMiddleware,
  checkRole(["admin", "seller"]),
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);
router.get(
  "/get-items",
  authMiddleware,
  checkRole(["admin", "seller"]),
  retrieveItems
);
router.get("/", authMiddleware, checkRole(["admin", "seller"]), getAllProducts);
router.get(
  "/item/:id",
  authMiddleware,
  checkRole(["admin", "seller"]),
  getaProduct
);

router.put(
  "/isavailable/:id",
  authMiddleware,
  checkRole(["admin", "seller"]),
  productIsAvailable
);
router.put(
  "/update/:id",
  authMiddleware,
  checkRole(["admin", "seller"]),
  updateProduct
);

router.get(
  "/search",
  authMiddleware,
  checkRole(["admin", "seller"]),
  searchProducts
);

router.delete(
  "/delete/:id",
  authMiddleware,
  checkRole(["admin", "seller"]),
  deleteProduct
);
router.put(
  "/upload/:id",
  authMiddleware,
  checkRole(["admin", "seller"]),
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
