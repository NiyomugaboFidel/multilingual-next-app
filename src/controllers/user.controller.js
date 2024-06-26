
import User from "../database/models/user";
import sendVerificationEmail from "../services/sendEmail.service";
import { register,findAllUser,findUserByEmail,findUserById, userExists } from "../services/user.service";
import { compareHashString, hashString } from "../utils/bcrypt";
import { generateToken, verifyToke } from "../utils/generateToken";


const createUser = async(req, res)=>{
const {firstName,lastName,email,password,isActive} = req.body

  try {  
    const data = {
      firstName,
      lastName,
      email,
      password,
      isActive
    }
  const existsUser = await findUserByEmail(email);
  if(existsUser){
    return res
    .status(401)
    .json({ success: false, error: 'User of this email already exists' });
  }

  const newUser  = await register(data);

  // generate token
  const token = generateToken(newUser, { expiresIn: '10d' });
  if(token){
    res.cookie('token',token,{
      httpOnly:true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  }
  await sendVerificationEmail(email, firstName,token);
  res.status(201).json({
    success:true, 
    message:'Successful registered.Please check your email for verification',
    user:newUser,
    token:token
  });
  } catch (error) {

    console.log(error)
    return res
    .status(500)
    .json({ success: false, error: 'Semothing went wrong' });
  }
};

const verifyEmail = async(req, res)=>{
   const {t} = req.query
   const token = t
   console.log(token)
   try {
    if(token){
      const decode = verifyToke(token);
      const user = await findUserById(decode?.payload.id);

      if(!user){
        return res
    .status(404)
    .json({ success: false, error: 'User not found' });
      }
      const currentTime = Math.floor(Date.now() /1000);
      if(decode.exp < currentTime){
        return res
        .status(401)
        .json({ success: false, error: 'Token expried' });
      }
      if(user.isEmailVerified === true){
        return res
    .status(200)
    .json({ success: true, message: 'User of this email already is verified' });
      }

      if(user.isEmailVerified === false){
        user.isEmailVerified = true
        await user.save()
      }
  
    }else{
      return res
      .status(401)
      .json({ success: false, error: 'No token in Url' });
    }
    return res
    .status(200)
    .json({ success: true, message: 'Email verified successfully' });
    
   } catch (error) {
    
    console.log(error.message);
    return res
    .status(500)
    .json({ success: false, error: 'Semothing went wrong' });
  }
   }


// loging user
const loginUser = async(req, res)=>{
  const {email, password} = req.body
  try {
    const user = await userExists(email);
    if(!user){
      return res
    .status(401)
    .json({ success: false, error: 'User Not found' });
    }
   const isCorrectPassword = compareHashString(password,user.password )
   if(!isCorrectPassword){
    return res.status(401).json({ success:false ,message: 'Invalid email or password' });
   }
   const token = generateToken(user, { expiresIn: '1d' });
   res.cookie('token',token,{
     httpOnly:true,
     maxAge: 24 * 60 * 60 * 1000,
   });
   res.status(200).json({success:true, message:'Login Successfully',user:user, token:token})
  } catch (error) {
    console.log(error?.message, error?.stack)
    return res
    .status(500)
    .json({ success: false, error: 'Semothing went wrong' });
  }
}





// change password || update password
const  changePassword = async(req, res)=>{
const {newPassword, confirmPassword, password} = req.body

  try {  
  const id = req.user.id 
  const user = await findUserById(id);
  const oldPassword = user.password 

  if(!user){
    return res
    .status(401)
    .json({ success: false, error: 'User not found' });
  }

  const isCorrectPassword  = await compareHashString(password,oldPassword);
  if(!isCorrectPassword){
    return res
    .status(401)
    .json({ success: false, error: 'Current password is incorrect' });
  }
  if(!newPassword === confirmPassword){
    return res
    .status(401)
    .json({ success: false, error: 'new and confirm password is not Match' });
  } 
  const hashPassword = await hashString(newPassword);
   user.password = hashPassword
   user.lastTimePasswordUpdated = Date.now();
   await user.save();

  res.status(201).json({success:true, message:'Password Updated successful'});
  } catch (error) {
    console.log(error?.message,error?.stack)
    return res
    .status(500)
    .json({ success: false, error: 'Semothing went wrong' });
  }
};

//get all users

 const getAllUsers = async(req,res)=>{
    try {
      const users = await findAllUser();
      if(!users){
        return res.status(200)
        .json({
          success:true
          ,message:'No user found'
         });
      }
      return res.status(200).json({success:true,message:'All users',users});

    } catch (error) {
      console.log(error?.message, error?.stack)
      return res
      .status(500)
      .json({ success: false, error: 'Semothing went wrong' });
    }
 }
 // get one user
 const getUser = async(req,res)=>{
  const {id } = req.params
  console.log(id)
    try {
      const user  = await findUserById(id);
      if(!user){
        return res.status(200)
        .json({
          success:true
          ,message:'User not found'
         });
      }

      return res.status(200).json({success:true,message:'User is found', user})
    } catch (error) {
      console.log(error?.message, error?.stack)
      return res
      .status(500)
      .json({ success: false, error: 'Semothing went wrong' });
    }
 }

export {createUser, verifyEmail,loginUser ,changePassword, getAllUsers,getUser}