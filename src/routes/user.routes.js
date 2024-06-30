// src/routes/user.routes.js
import express from 'express';
import {
     changePassword,
     createUser,
     deleteUser, 
     editUserProfile, 
     forgetPasswordToken, 
     getAllUsers, getUser, 
     loginUser, 
     resetPassword, 
     verifyEmail 
    } from '../controllers/user.controller';
import { authMiddleware, checkRole } from '../middlewares/authMiddleware';
import isAdmin from '../middlewares/Admin.Middleware';
import validate from '../middlewares/validationMiddleware';
import { UpdatedPasswordSchema, signUpSchema, userProfileSchema } from '../validation/validateSchemas';

const router = express.Router();

router.post('/create', validate(signUpSchema), createUser);
router.post('/login',loginUser);
router.put('/edit-profile',authMiddleware,editUserProfile);
router.put('/update-password', validate(UpdatedPasswordSchema),authMiddleware,checkRole(['admin','buyer']),changePassword);
router.post('/forget-password',forgetPasswordToken);
router.put('/rest-password',validate(resetPassword),resetPassword);
router.delete('/delete-user/:id',authMiddleware,isAdmin,deleteUser);

router.get('/verify-email', verifyEmail);
router.get('/all-users',authMiddleware, isAdmin,getAllUsers);
router.get('/user/:id', authMiddleware,isAdmin,getUser);



export default router;
