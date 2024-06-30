import User from '../database/models/user';
import {hashString, compareHashString} from'../utils/bcrypt';

// register function
const register = async(data)=>{
const {firstName,lastName,email,password,isActive} = data
 try {
    const userDate = {
        firstName,
        lastName,
        email,
        password:hashString(password),
        isActive
    }
    const newUser = await User.create(userDate)
    return newUser
    
 } catch (error) {
    console.error('fail',error);
    throw new Error('Something went wrong');
 }
}

// find user by emaill
const findUserByEmail = async(email)=>{
 const user  = await User.findOne({where:{email}});
 if(user == null){
  console.log('findUserByEmail return "null"');  
  return false
 }else{
    return user
 }
}
// find user by Id
const findUserById = async(id)=>{
 const user  = await User.findOne({where:{id}});
 if(user == null){
  console.log('findUserById return "null"');  
  return false
 }else{
    return user
 }
}
// find user by Id
const findAllUser= async()=>{
 const users = await User.findAll({
    order:[
        ['createdAt','DESC']
    ]
 });
 if(users == null){
  console.log('findAll users return "null"');  
  return false
 }else{
    return users
 }
}

const logout = async (userData) => {
   const token = userData.split(' ')[1];
   await Blacklist.create({ token });
 };
const userExists = async(email)=>{
    const user = await User.findOne({where:{email}});
    return user
}

export {register ,findUserByEmail,findUserById,findAllUser,userExists,logout}