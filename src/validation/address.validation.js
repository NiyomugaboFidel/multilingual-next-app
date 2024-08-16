import Joi from "joi";
const addressProfileSchema = Joi.object({
    street:Joi.string().max(20).required(),
    province:Joi.string().max(20).required(),
    district:Joi.string().max(20),
    city:Joi.string().max(20).required(),
    pobox:Joi.string().optional().required(),
    country:Joi.string().max(20).required(),
    phoneNo:Joi.string().min(10).pattern(/^\+?[1-9]\d{1,14}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' , 'org','co'] } }).required()

  })
  export const addressProfile = async (req, res, next) => {
    const { error } = addressProfileSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
    }
    next();
  };