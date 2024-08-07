/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

const productValidationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  price: Joi.number().integer().required(),
  categoryId: Joi.string().uuid(),
  expiryDate: Joi.string(),
  bonus: Joi.number().integer(),
  quantity: Joi.number().integer(),
  sellerId: Joi.string().uuid(),
});

export const productValidation = async (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};
