import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from "../database/models/user"; // Adjust the import according to your project structure

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY , // Replace with your secret
};

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ where: { id: jwtPayload.payload.id } });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
