const Joi = require('joi');

// Define a schema to validate a UUID
const schema = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4'] }).required()
});

// Function to validate UUID
function validateUUID(uuid) {
  const { error, value } = schema.validate({ id: uuid });

  if (error) {
    console.error('Validation error:', error.details[0].message);
    return false; // Indicate validation failure
  }

  console.log('Valid UUID:', value.id);
  return true; // Indicate validation success
}


export default  validateUUID