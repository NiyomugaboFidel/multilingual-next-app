import passport from 'passport';
import '../configs/passport'; // Ensure passport configuration is executed

export const authenticateJwt = passport.authenticate('jwt', { session: false });
