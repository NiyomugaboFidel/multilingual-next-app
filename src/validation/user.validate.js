import Joi from "joi";
const userProfileSchema = Joi.object({
    gender:Joi.string().valid('male','female'),
    DOB:Joi.date().greater('1-1-1900').less('1-1-2100'),
    prefferedCurrency:Joi.string().uppercase(),
    prefferedLanguage:Joi.string(),
    street:Joi.string().max(20),
    province:Joi.string().max(20),
    district:Joi.string().max(20),
    phoneNo:Joi.string().length(10).pattern(/^[0-9]+$/),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' , 'org','co'] } })
  })
  export const editUserProfil = async (req, res, next) => {
    const { error } = userProfileSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
    }
    next();
  };