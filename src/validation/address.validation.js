import Joi from "joi";
const addressProfileSchema = Joi.object({
    street:Joi.string().max(20),
    province:Joi.string().max(20),
    district:Joi.string().max(20),
    city:Joi.string().max(20),
    pobox:Joi.string().optional(),
    country:Joi.string().max(20),
    phoneNo:Joi.string().length(10).pattern(/^[0-9]+$/),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' , 'org','co'] } })

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