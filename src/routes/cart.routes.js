import express from "express";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware";
import { cartValidation } from "../validation/cart.validation";
import { addProductToCart, getUsercart, isProductAvailable, isProductExpired } from "../middlewares/cart.middleware";
import { AddToCart } from "../controllers/cart.controllers";
const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  checkRole(["admin", "seller"]),
  cartValidation,
  isProductAvailable,
  isProductExpired,
  getUsercart,
  addProductToCart,
  AddToCart
);

export default router;
