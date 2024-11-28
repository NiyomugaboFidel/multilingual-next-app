import Category from "../database/models/category";
import NestedSubcategory from "../database/models/nextedsubcategory";
import Subcategory from "../database/models/subcategory"; // Import subcategory model

// Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }
    const newCategory = await Category.create({ name });
    return res.status(201).json({
      success: true,
      message: "New category created successfully",
      newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Create a new subcategory
const createSubcategory = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    if (!name || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name and category ID are required",
      });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Parent category not found",
      });
    }

    const newSubcategory = await Subcategory.create({ name, category_id: categoryId });
    return res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      newSubcategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const nestedCreateSubcategory = async (req, res) => {
  const { name, categoryId, subcategoryId } = req.body;

  try {
    if (!name || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name and category ID are required",
      });
    }

    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (subcategoryId) {
      const parentSubcategory = await Subcategory.findOne({ where: { id: subcategoryId } });
      if (!parentSubcategory || parentSubcategory.category_id !== categoryId) {
        return res.status(400).json({
          success: false,
          message: "Invalid parent subcategory",
        });
      }

    }

    // Prevent duplicate subcategories
    const existingSubcategory = await Subcategory.findOne({
      where: { name, category_id: categoryId },
    });
    if (existingSubcategory) {
      return res.status(400).json({
        success: false,
        message: "Subcategory with this name already exists",
      });
    }

    const newSubcategory = await NestedSubcategory.create({
      name,
      subcategory_id: subcategoryId,
    });

    return res.status(201).json({
      success: true,
      message: "NestedSubcategory created successfully",
      newSubcategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Get a category by ID with nested subcategories
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      where: { id },
      include: [
        {
          model: Subcategory,
          as: 'subcategories', // First level subcategories
          include: [
            {
              model: NestedSubcategory,
              as: 'nestedsubcategories', // Nested subcategories (children of subcategories)
            },
          ],
        },
      ],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category with this ID not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Subcategory,
          as: 'subcategories', // First level subcategories
          include: [
            {
              model: NestedSubcategory,
              as: 'nestedsubcategories', // Nested subcategories (children of subcategories)
            },
          ],
        },
      ],
    });

    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: 'No categories found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'List of all categories',
      categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category with this ID not found",
      });
    }

    await category.update({ name });
    return res.status(200).json({
      success: true,
      message: `Category updated successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category with this ID not found",
      });
    }

    await category.destroy();
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// Delete a subcategory
const deleteSubcategory = async (req, res) => {
  const { id:subcategoryId } = req.params;

  try {
    // Check if the subcategory exists
    const subcategory = await Subcategory.findByPk(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    // Delete the subcategory
    await subcategory.destroy();
    return res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a subcategory
const updateSubcategory = async (req, res) => {
  const { id:subcategoryId } = req.params;
  const { name, categoryId } = req.body;

  try {
    // Check if the subcategory exists
    const subcategory = await Subcategory.findByPk(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    // Check if the category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Update the subcategory
    subcategory.name = name || subcategory.name;
    subcategory.category_id = categoryId || subcategory.category_id;
    await subcategory.save();

    return res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      subcategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a nested subcategory
const deleteNestedSubcategory = async (req, res) => {
  const { id:nestedSubcategoryId } = req.params;

  try {
    // Check if the nested subcategory exists
    const nestedSubcategory = await NestedSubcategory.findByPk(nestedSubcategoryId);
    if (!nestedSubcategory) {
      return res.status(404).json({
        success: false,
        message: "Nested subcategory not found",
      });
    }

    // Delete the nested subcategory
    await nestedSubcategory.destroy();
    return res.status(200).json({
      success: true,
      message: "Nested subcategory deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a nested subcategory
const updateNestedSubcategory = async (req, res) => {
  const { id:nestedSubcategoryId } = req.params;
  const { name, subcategoryId } = req.body;

  try {
    // Check if the nested subcategory exists
    const nestedSubcategory = await NestedSubcategory.findByPk(nestedSubcategoryId);
    if (!nestedSubcategory) {
      return res.status(404).json({
        success: false,
        message: "Nested subcategory not found",
      });
    }

    // Check if the subcategory exists
    const subcategory = await Subcategory.findByPk(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    // Update the nested subcategory
    nestedSubcategory.name = name || nestedSubcategory.name;
    nestedSubcategory.subcategory_id = subcategoryId || nestedSubcategory.subcategory_id;
    await nestedSubcategory.save();

    return res.status(200).json({
      success: true,
      message: "Nested subcategory updated successfully",
      nestedSubcategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  createCategory,
  createSubcategory,
  nestedCreateSubcategory,
  getCategories,
  getCategory,
  updateCategory,
  updateSubcategory,
  updateNestedSubcategory,
  deleteCategory,
  deleteSubcategory,
  deleteNestedSubcategory
};
