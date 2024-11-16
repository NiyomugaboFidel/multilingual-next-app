const Joi = require('joi');

// Define a Joi schema to validate UUID
const schema = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4'] }).required(),
});


function validateUUID(uuid) {

  const regexExpV4 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-4[0-9a-fA-F]{3}\b-[89abAB][0-9a-fA-F]{3}\b-[0-9a-fA-F]{12}$/;


  if (!regexExpV4.test(uuid)) {
    console.error('Validation error: UUID does not match the UUID v4 structure');
    return false; 
  }


  const { error, value } = schema.validate({ id: uuid });

  if (error) {
    console.error('Validation error:', error);
    return false; 
  }

  console.log('Valid UUID:', value.id);
  return true;
}


export function verifyId(id) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-4[0-9a-fA-F]{3}\b-[89abAB][0-9a-fA-F]{3}\b-[0-9a-fA-F]{12}$/;
  return regexExp.test(id); 
}

// Test Case
// const testUUID = 'f7eb49f1-de84-4b8d-a44c-ffe69cca6435';
// const isValid = validateUUID(testUUID); // Validate using combined checks
// console.log('Is the UUID valid?', isValid);

export default validateUUID;
