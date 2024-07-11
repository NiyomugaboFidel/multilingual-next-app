import'../services/googleOauth'
import passport from 'passport'

const googleAuthotication  = (req, res, next)=>{
    passport.authenticate('google', { scope: ['profile', 'email'] })(req,res,next)
}

const googleCallback = (req, res)=>{
 const  {user , token} = req.user
 console.log('token',token);
 if(token){
  res.cookie('token',token,{
    httpOnly:true,
    maxAge: 24 * 60 * 60 * 1000,
  });
}
 res.status(201).json({
    success:true, 
    message:'Login successfully',
    user:user,
    token:token
  });
}

const logoutGoogleOauth =  (req, res) => {
  req.logout();
};

export {googleAuthotication, googleCallback,logoutGoogleOauth}