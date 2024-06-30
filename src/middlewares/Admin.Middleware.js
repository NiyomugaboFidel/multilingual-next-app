import { findUserById } from "../services/user.service";
import validateUUID from "../validation/isValidateId";


const isAdmin = async(req, res, next)=>{
    const id = req.user.id
    const isId = validateUUID(id);
    if(!isId){
      return res
      .status(401)
      .json({ success: false, error: 'user not Defined Please login again' });
    }
    const user = await findUserById(id);
 try {
   if(!user){
    return res
    .status(401)
    .json({ success: false, error: 'user not Defined Please login again' });
   }else{
    console.log(user.role);
    if(!user.role.includes('admin')){
        return res
        .status(401)
        .json({ success: false, error: 'Your role is not accepted'});  
    }
    if(user.role.includes('admin')){
          next()
    }
   }
    
    
 } catch (error) {
     console.log(error.message, error.stack);
        return res
        .status(401)
        .json({ success: false, error: 'Something went wrong'});  
    
 }
}
export default isAdmin