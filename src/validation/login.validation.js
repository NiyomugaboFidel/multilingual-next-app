import Joi from "joi";
const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
const userValdation = async (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message:"Invalid credentials"
    });
  }
  next();
};
export default userValdation;







