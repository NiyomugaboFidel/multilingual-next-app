import express from "express";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { cartValidation } from "../../validation/cart.validation";
import { addProductToCart, checkProductInCart, getUsercart, isProductAvailable, isProductExpired } from "../../middlewares/cart.middleware";
import { AddToCart, clearCart, removeFromCart, viewCart } from "../../controllers/cart.controllers";
const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  checkRole(["buyer"]),
  cartValidation,
  isProductAvailable,
  isProductExpired,
  getUsercart,
  addProductToCart,
  AddToCart
);
router.get(
  '/view',
  authMiddleware,
  checkRole(['buyer']),
  getUsercart,
  viewCart
)
router.put(
  '/clear',
  authMiddleware,
  checkRole(['buyer']),
  getUsercart,
  clearCart
)
router.patch(
  '/remove/:productId',
  authMiddleware,
  checkRole(['buyer']),
  getUsercart,
  checkProductInCart,
  removeFromCart
)
export default router;
