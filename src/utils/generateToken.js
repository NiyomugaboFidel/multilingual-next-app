import jwt from'jsonwebtoken'

const generateToken = (payload, options)=>{
    const token = jwt.sign({payload},process.env.JWT_SECRET_KEY,options);
    return token
};

const verifyToke = (token)=>{
  const pyload = jwt.verify(token,process.env.JWT_SECRET_KEY);
  return pyload
}
export {generateToken, verifyToke}