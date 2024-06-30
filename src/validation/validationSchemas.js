// validationSchemas.js
import Joi  from'joi';
import PasswordComplexity from'joi-password-complexity'

const complexityOptions = {
    min: 6,
    max: 8,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
};

// Define common reusable validation schemas
const idSchema = Joi.string().uuid();
const nameSchema = Joi.string().min(3).max(30).required();
const emailSchema = Joi.string().email().required();
const passwordSchema = PasswordComplexity(complexityOptions).required();
const roleSchema = Joi.string().valid('buyer', 'seller','Admin').default('buyer');
const phoneNumberSchema = Joi.string().pattern(/^[0-9]+$/, 'numbers');
const currentPassword = Joi.string().required();

export {
  idSchema,
  nameSchema,
  emailSchema,
  passwordSchema,
  roleSchema,
  phoneNumberSchema,
  currentPassword
}
