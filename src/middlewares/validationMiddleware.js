// middleware/validationMiddleware.js
const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
        status: 400,
        error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
      });
  }
  next();
};

export default validate;
