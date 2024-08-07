import Joi from 'joi';
const categorySchema = Joi.object({
  name: Joi.string().required().min(3).max(255),
});
const categoryValdation = async (req, res, next) => {
  const { error } = categorySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};
export default categoryValdation;
