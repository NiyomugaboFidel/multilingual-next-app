import PasswordComplexity from'joi-password-complexity'
import Joi from 'joi';
const validatePassword = (schema)=> (payload)=> schema.validate(payload,{abortEasly:false})

const complexityOptions = {
    min: 6,
    max: 8,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
};

const passwordSchema = Joi.object({
    password:Joi.string().required(),
    confirmPassword:PasswordComplexity(complexityOptions).required(),
    newPassword:PasswordComplexity(complexityOptions).required(),
});

const isvalide = validatePassword(passwordSchema)

const valideMiddleware = (req, res, next)=>{
      const {error} = isvalide(req.body)
      if (error) {
        res.status(400).json({
          status: 400,
          error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
        });
      } else {
        next();
      }
    }
export default valideMiddleware