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

export function verifyId(id){
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const verifyId = regexExp.test(id);
  if(verifyId){
    return true;
  }else{
    return false;
  }
}
export default  validateUUID