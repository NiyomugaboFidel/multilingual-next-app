// src/routes/user.routes.js
import express from 'express';
import { changePassword, createUser, getAllUsers, getUser, loginUser, verifyEmail } from '../controllers/user.controller';
import { validationSignUp } from '../validation/auth.validate';
import { authMiddleware, checkRole } from '../middlewares/authMiddleware';
import valideMiddleware from '../validation/password.validation';

const router = express.Router();

router.post('/create', validationSignUp, createUser);
router.get('/verify-email', verifyEmail);
router.post('/login',loginUser);
router.put('/update-password', valideMiddleware,authMiddleware,checkRole(['admin','buyer']),changePassword);

router.get('/all-users', getAllUsers);
router.get('/user/:id', getUser);


export default router;
