import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controllers";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware";
import { isCategoryExistByName } from "../middlewares/category.middleware";
import categoryValidation from "../validation/category.validation";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["seller", "admin"]),
  categoryValidation,
  isCategoryExistByName,
  createCategory
);

router.get("/", authMiddleware, getCategories);

router.get("/:id", authMiddleware, getCategory);

router.put(
  "/update/:id",
  authMiddleware,
  checkRole(["seller", "admin"]),
  categoryValidation,
  isCategoryExistByName,
  updateCategory
);

router.delete(
  "/delete/:id",
  authMiddleware,
  checkRole(["seller", "admin"]),
  deleteCategory
);

export default router;
