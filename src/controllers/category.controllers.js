import { where } from "sequelize";
import Category from "../database/models/category";

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
   return   res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }
    const newCategory = await Category.create({
      name: name,
    });
   return res
      .status(201)
      .json({
        success: true,
        message: "New Category created successful",
        newCategory,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};
const getCategory = async (req, res) => {
  const { id } = req.params;
//   console.log("categoryId", id);
  try {
    if (!id) {
     return res
        .status(400)
        .json({ success: false, message: "No id atteched to the params" });
    }
    const category = await Category.findOne({ where: { id } });
    if (!category) {
     return res
        .status(400)
        .json({
          success: false,
          message: "Category of this id is not found",
        });
    }

   return res
      .status(200)
      .json({
        success: true,
        message: `Category here is ${category.name}`,
        category,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["createdAt", "DESC"]],
    });

    if(categories == null ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No category create , table of category is empty",
        });
    }else{
       return res
        .status(200)
        .json({ success: true, message: `List of All Categories `, categories });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};

const updateCategory = async (req, res) => {
  const id = req.query.id;
  const { newName } = req.body;
  try {
    if (!id) {
     return res
        .status(400)
        .json({ success: false, message: "No id atteched to the params" });
    }
    if (!newName) {
      return res.status(400).json({ success: false, message: "newName is required" });
    }
    
    const oldCategory = await Category.destroy({ where: { id } });
    if (!oldCategory) {
     return res
        .status(400)
        .json({
          success: false,
          message: "Category of this id is not included, invald id",
        });
    }
    const category = await Category.update(
      {
        name: newName,
      },
      {
        where: { id },
      }
    );
    if (!category) {
     return res
        .status(400)
        .json({
          success: false,
          message: "Category of this id is not included, invald id",
        });
    }

  return  res
      .status(200)
      .json({
        success: true,
        message: `New Category is ${newName}`,
        category,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};
const deleteCategory = async (req, res) => {
  const {id} = req.params;
//   console.log("categoryId", id);
  try {
    if (!id) {
    return  res
        .status(400)
        .json({ success: false, message: "No id atteched to the params" });
    }

    const oldCategory = await Category.destroy({ where: { id } });
    if (!oldCategory) {
    return  res
        .status(400)
        .json({
          success: false,
          message: "Category of this id is not included, invald id",
        });
    }

    const category = await Category.destroy({ where: { id } });

   return res
      .status(200)
      .json({
        success: true,
        message: `Category deleted Successful`,
        category,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};

export {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
