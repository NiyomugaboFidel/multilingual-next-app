import express from "express";
import {
  googleAuthotication,
  googleCallback,
} from "../controllers/googleCallBack";
import passport from "passport";

const router = express.Router();

router.get("/auth/google", googleAuthotication);
router.get(
  "/auth/google/redirect",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleCallback
);
// router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   res.redirect('/dashboard');
// });

export default router;
