import Category from "../database/models/category";

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }
    const newCategory = await Category.create({ name });
    return res
      .status(201)
      .json({
        success: true,
        message: "New category created successfully",
        newCategory,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "No ID attached to the parameters" });
    }
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Category with this ID not found",
        });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: `Category: ${category.name}`,
        category,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [["createdAt", "DESC"]] });

    if (!categories.length) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No categories found",
        });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "List of all categories",
        categories,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "No ID attached to the parameters" });
    }
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const oldCategory = await Category.findOne({ where: { id } });
    if (!oldCategory) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Category with this ID not found",
        });
    }

    await Category.update({ name }, { where: { id } });

    return res
      .status(200)
      .json({
        success: true,
        message: `Category updated to ${name}`,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "No ID attached to the parameters" });
    }

    const category = await Category.destroy({ where: { id } });
    if (!category) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Category with this ID not found",
        });
    }

    return res
      .status(200)
      .json({
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
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
