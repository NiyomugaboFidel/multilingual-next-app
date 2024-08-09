import Joi from 'joi';
const orderSchema = Joi.object({
  status: Joi.string().valid('pending','shipped','delivered')
});
const orderValdation = async (req, res, next) => {
  const { error } = orderSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};
export default orderValdation;
