import jwt from'jsonwebtoken'
import {findUserById } from "../services/user.service";


const authMiddleware = async(req, res,next)=>{
  

//  if( req &&
//     req.headers &&
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')){
//     const token = req?.headers.authorization.split(' ')[1];
 if(req.cookies){
    const token = req?.cookies.token;

    try {
        if(token){
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const user = await findUserById(decode?.payload.id);
            // console.log({'User in auth':user});
            req.user = user
            if(user){
            next()
             
            }else{
                return res
                .status(401)
                .json({ success: false, error: 'Not Authorized token expired, Please login again' });  
            }
        }   
    } catch (error) {
        return res
        .status(401)
        .json({ success: false, error: 'Not Authorized token expired, Please login again' });
    }
 }else{
    return res
    .status(500)
    .json({success: false, error: 'There is no token attached to header' });
 }
}

const checkRole = (roles) => async(req, res, next)=>{
    
 try {
    const id = req.user.id
    const user = await findUserById(id);
    
    if(roles.includes(user.role)){
        next()
    }else{
        return res
        .status(401)
        .json({ success: false, error: `Access denied: Your role is not permitted. Allowed roles are: ${roles.join(' / ')}` });

    }
 } catch (error) {
    console.error(error.message)
    return res
    .status(500)
    .json({ status:500, success: false, error: 'Server error'});
 }
}

export {authMiddleware, checkRole}