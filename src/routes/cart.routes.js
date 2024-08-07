import express from "express";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware";
import { cartValidation } from "../validation/cart.validation";
import { addProductToCart, checkProductInCart, getUsercart, isProductAvailable, isProductExpired } from "../middlewares/cart.middleware";
import { AddToCart, clearCart, removeFromCart, viewCart } from "../controllers/cart.controllers";
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
router.get(
  '/view',
  authMiddleware,
  getUsercart,
  viewCart
)
router.put(
  '/clear',
  authMiddleware,
  checkRole(['admin','buyer']),
  getUsercart,
  clearCart
)
router.patch(
  '/remove/:productId',
  authMiddleware,
  checkRole(['admin','buyer']),
  getUsercart,
  checkProductInCart,
  removeFromCart
)
export default router;
