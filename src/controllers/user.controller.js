
import User from "../database/models/user";
import {sendRestEmail, sendVerificationEmail} from "../services/sendEmail.service";
import { register,findAllUser,findUserByEmail,findUserById, userExists } from "../services/user.service";
import { compareHashString, hashString } from "../utils/bcrypt";
import { generateToken, verifyToke } from "../utils/generateToken";
import validateUUID from "../validation/isValidateId";

// create new user
// ====================
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
  const token = generateToken(newUser, { expiresIn: '1d' });
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
//verify email of user
// =======================
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



//login a user
// =======================
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

// Logout a user
// =======================
const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, error: 'Something went wrong during logout' });
  }
}

const editUserProfile = async(req, res)=>{
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    prefferedLanguage,
    prefferedCurrency,
    phoneN} = req.body
  try {
    const id = req.user.id
    const isId = validateUUID(id);
    if(!isId){
      return res
      .status(401)
      .json({ success: false, error: 'user not Defined Please login again' });
    }
    const user  = await findUserById(id);
    if(!user){
      return res
      .status(401)
      .json({ success: false, error: 'user not found' });
    }
    let billingAddress;
    billingAddress = JSON.stringify({
      province: req.body.province,
      district: req.body.district,
      street: req.body.street,
      phoneN: req.body.phoneN,
      email: req.body.email,
      city: req.body.city,
      state: req.body.state, 
      postalCode: req.body.postalCode,
    });
    let profilePic;
    if (req.body.gender === 'male') {
      profilePic = 'https://res.cloudinary.com/dboqnapgi/image/upload/v1687259119/172628_user_male_icon_hqmwjh.svg';
    }
    if (req.body.gender === 'female') {
      profilePic = 'https://res.cloudinary.com/dboqnapgi/image/upload/v1687259111/172624_female_user_icon_pgj7lc.svg';
    }
    const newUser = await User.update(
      {
    firstName :firstName||user.firstName,
    lastName:lastName||user.lastName,
    gender:gender,
    prefferedLanguage:prefferedLanguage,
    prefferedCurrency:prefferedCurrency,
    userAddress:JSON.parse(billingAddress),
    phoneN,
    profilePic
      },{
        where:{id:user.id}
      }
    )
   await user.save()
    return res
    .status(200)
    .json({ success: true, message: 'edit profile successfully',newUser:user });
  } catch (error) {
    return res
    .status(500)
    .json({ success: false, error: 'Something went wrong'});
  }
}
//forget password token
// =======================
const forgetPasswordToken = async(req, res)=>{
  const email = req.body.email;

  const user = await User.findOne({where:{email}})
  console.log(user)
  if(!user) throw new Error('User not found with this email');
  const data = {
    email,
    id:user.id
  }
  try {
    const token = generateToken(data, { expiresIn: '2hrs' });
     await user.save();
  
     await sendRestEmail(user.email ,user.lastName,token); 
     res.json(token);
     
  } catch (error) {
     throw new Error(error);
  };
 
 };
 //rest password /forget-password
// =======================
const resetPassword = async (req, res) => {
  try {
    const { t } = req.query
    const {payload} = verifyToke(t);
    console.log(payload.email)

    if (payload) {
      const hashPassword = hashString(req.body.password);
     await User.update(
        {
          password: hashPassword,
          lastTimePasswordUpdated: new Date(),
          expired: false,
        },
        {
          where: { email:payload.email },
        }
      );
      res.status(200).json({ message: 'Password changed successfully' });
    } else {
      res.status(400).json({ message: 'Token has expired' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' });
  }
};



// change password || update password
// =========================================
const  changePassword = async(req, res)=>{
const {newPassword, confirmPassword, password} = req.body

  try {  
  const id = req.user.id 
  const isId = validateUUID(id);
  if(!isId){
    return res
    .status(401)
    .json({ success: false, error: 'user not Defined Please login again' });
  }
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
// =========================
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
 // get a user
//  ==========================
 const getUser = async(req,res)=>{
  const {id } = req.params
  const isId = validateUUID(id);
  if(!isId){
    return res
    .status(401)
    .json({ success: false, error: 'user id is not validate' });
  }
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

 // delete a user
//  =======================
 const deleteUser = async(req, res)=>{
  const {id} = req.params
  const isId = validateUUID(id);
  if(!isId){
    return res
    .status(401)
    .json({ success: false, error: 'user id is not validate' });
  }
  try {
    const user = await findUserById(id);
    if(!user){
      return res
      .status(401)
      .json({ success: false, error: 'user not found' });
    }
    const deletedUser = await User.destroy({where:{id:id}});
    if(!deleteUser){
      return res
      .status(401)
      .json({ success: false, error: 'Failed to delete user, try again'});
    }
     
    return res
    .status(200)
    .json({ success: true, message: 'User deleted successfully',deletedUser:deletedUser });
  } catch (error) {
    console.log(error.message, error.stack);
    return res
    .status(500)
    .json({ success: false, error: 'Semothing went wrong' });
  }
 }

export {
  createUser, 
  verifyEmail, 
  loginUser, 
  editUserProfile,
  changePassword, 
  getAllUsers, 
  getUser, 
  deleteUser, 
  resetPassword, 
  forgetPasswordToken,
  logoutUser,
}