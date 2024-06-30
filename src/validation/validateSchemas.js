import Joi from 'joi'
import { 
    currentPassword, 
    emailSchema, 
    nameSchema, 
    passwordSchema, 
    phoneNumberSchema, 
    roleSchema 
} from "./validationSchemas";

const signUpSchema = Joi.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  });
const userProfileSchema = Joi.object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    phoneN: phoneNumberSchema
  });

  const UpdatedPasswordSchema = Joi.object({
    password:currentPassword,
    confirmPassword:passwordSchema,
    newPassword:passwordSchema,
});
  const restPasswordSchema = Joi.object({
    password:passwordSchema,
  
});


  export {
    userProfileSchema,
    signUpSchema,
    UpdatedPasswordSchema,
    restPasswordSchema
}