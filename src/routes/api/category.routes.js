import express from "express";
import {
  createCategory,
  createSubcategory,
  deleteCategory,
  getCategories,
  getCategory,
  nestedCreateSubcategory,
  updateCategory,
} from "../../controllers/category.controllers";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { isCategoryExistByName } from "../../middlewares/category.middleware";
import categoryValidation from "../../validation/category.validation";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["seller", "admin"]),
  categoryValidation,
  isCategoryExistByName,
  createCategory
);
router.post(
  "/subcategory",
  authMiddleware,
  checkRole(["seller", "admin"]),
  createSubcategory
);
router.post(
  "/nestedsubcategory",
  authMiddleware,
  checkRole(["seller", "admin"]),
  nestedCreateSubcategory
);

router.get("/", getCategories);

router.get("/:id", getCategory);

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
