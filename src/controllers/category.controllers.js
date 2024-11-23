import Category from "../database/models/category";
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
  const { name, categoryId, parentId } = req.body;
  console.log({ name, categoryId, parentId })

  try {
    if (!name || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name and category ID are required",
      });
    }

    // Check if the parent category exists
    const category = await Category.findOne({where:{id:categoryId}});
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Parent category not found",
      });
    }

    // Validate the parent subcategory if `parentId` is provided
    let parentSubcategory = null;
    if (parentId) {
      parentSubcategory = await Subcategory.findOne({where:{id:parentId}});

      if (!parentSubcategory) {
        return res.status(404).json({
          success: false,
          message: "Parent subcategory not found",
        });
      }

      // Ensure the parent subcategory belongs to the same category
      if (parentSubcategory.category_id !== categoryId) {
        return res.status(400).json({
          success: false,
          message: "Parent subcategory does not belong to the same category",
        });
      }
    }

    // Create the new subcategory
    const newSubcategory = await Subcategory.create({
      name,
      category_id: categoryId,
      parent_id: parentId || null, // Optional nesting
    });

    return res.status(201).json({
      success: true,
      message: "New subcategory created successfully",
      newSubcategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


// Get a category by ID with nested subcategories
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      where: { id },
      include: {
        model: Subcategory,
        as: "subcategories",
        include: {
          model: Subcategory,
          as: "subcategories", // Recursive inclusion
        },
      },
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

// Get all categories with nested subcategories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Subcategory,
          as: 'subcategories',
         
          include: [
            {
              model: Subcategory,
              as: 'subcategories', // Nested subcategories
              
            },
          ],
        },
      ],
   
    });

    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List of all categories",
      categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
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

export {
  createCategory,
  createSubcategory,
  nestedCreateSubcategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
