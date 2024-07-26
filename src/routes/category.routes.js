import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controllers";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware";
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["seller", "admin"]),
  createCategory
);
router.get("/", authMiddleware, checkRole(["seller", "admin"]), getCategories);
router.get("/:id", authMiddleware, checkRole(["seller", "admin"]), getCategory);
router.put(
  "/update",
  authMiddleware,
  checkRole(["seller", "admin"]),
  updateCategory
);
router.delete(
  "/delete/:id",
  authMiddleware,
  checkRole(["seller", "admin"]),
  deleteCategory
);

export default router;
