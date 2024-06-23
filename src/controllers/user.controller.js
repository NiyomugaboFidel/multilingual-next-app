import User from "../database/models/user";
import asyncHandler from "async-handler";


const createUser = async(req, res)=>{
  try {
    console.log(req.body);
  const userData = req.body
  const newUser = await User.create(userData);
  res.status(201).json({message:'User created successfully', newUser});
  } catch (error) {
    console.log('Something went wrong', error)
  }
};

export {createUser}