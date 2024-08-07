import Joi from "joi";
const wishProductValidation = Joi.object({
    productId: Joi.string().required(),
  });
  
  export const prodWishValidation = async (req, res, next) => {
    const { error } = wishProductValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
    } 
    else {
      next();
    }
  };