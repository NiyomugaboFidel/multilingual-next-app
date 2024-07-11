import User from "../database/models/user";
import { generateToken } from "../utils/generateToken";
import passport from'passport';
import 'dotenv/config';
const GoogleStrategy = require('passport-google-oauth20').Strategy;





// Passport setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/redirect',
}, async (accessToken, refreshToken, profile, done) => {
try {
console.log(profile);
   // Handle user information here
   const existingUser = await User.findOne({
    where: { email: profile.emails[0].value },
  });
  if(existingUser){

  if(existingUser.provider!='google'){
    const message="only google authenticated users!"
    return done(message,null)
  }
  existingUser.isEmailVerified = true;
  await existingUser.save();
  const {id, firstname, email, role } = existingUser;
  const person = { id,firstname, email, role };
  console.log('person',person);
  const token = generateToken(person, { expiresIn: '1d' });
  return done(null, { existingUser, token });
  }else{
    const userData={
      googleId:profile.id,
      firstName:profile.name.givenName,
      lastName:profile.name.familyName,
      profilePic: profile.photos[0].value,
      email:profile.emails[0].value,
      provider:'google',
      isEmailVerified:true,
    }
    const newUser=await User.create(userData)
    const {id, firstname, email, role } = newUser;
    const newPerson = { id,firstname, email, role };
    const token=generateToken(newPerson, { expiresIn: '1d' })
    return done(null,{newUser,token})
  }
  
} catch (error) {
  console.log(error.message,error.stack);
  done(error)
}
}));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  User.findOne({ where: email })
  .then((user) => done(null, user))
  .catch((err) => done(err));
})

