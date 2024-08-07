import Category from "../database/models/category";

const isCategoryExistByName = async (req, res, next) => {
  const { name } = req.body;
  const isExist = await Category.findOne({ where: { name } });
  if (isExist) {
    return res.status(404).json({ message: 'Category is already exist' });
  }
  next();
};

export { isCategoryExistByName };
