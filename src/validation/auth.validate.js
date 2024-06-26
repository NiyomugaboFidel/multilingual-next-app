import Joi from "joi";
import PasswordComplexity from'joi-password-complexity'


const validateForm = (schema) => (pyload)=> schema.validate(pyload,{abortEasly:false});
const complexityOptions = {
    min: 6,
    max: 8,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
};

const signUpSchema = Joi.object({
    firstName:Joi.string().min(3).trim().required(),
    lastName:Joi.string().min(3).trim().required(),
    email:Joi.string().email().trim().required(),
    password:PasswordComplexity(complexityOptions).required()
})

const validateSignUp  = validateForm(signUpSchema);

const validationSignUp = (req, res, next)=>{
    const {error} = validateSignUp(req.body);
    if (error) {
        res.status(400).json({
          status: 400,
          error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
        });
      } else {
        next();
      }
}




export {validationSignUp}