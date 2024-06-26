import bcrypt from'bcrypt';

const hashString = (string)=>{
try {
 const salt = bcrypt.genSaltSync(10);//generating salt 10 rounds

 const hashedString =  bcrypt.hashSync(string,salt); //hashing string
 return hashedString

} catch (error) {
    console.error('semothing went wrong', error);
    throw new Error('Failed to hash');
}
}

const compareHashString = (value1, value2)=>{
  try {
    const comparedString = bcrypt.compareSync(value1,value2);
    return comparedString
  } catch (error) {
    console.error('semothing went wrong', error);
    throw new Error('Failed to compare hash');
  }}

export {hashString, compareHashString}