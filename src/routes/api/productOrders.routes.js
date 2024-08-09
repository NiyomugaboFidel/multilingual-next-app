import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware';
import { addOrderAddress, orderCheckOut } from '../../controllers/order.controller';
import orderValdation from '../../validation/order.validation';
import { getUsercart } from '../../middlewares/cart.middleware';
import { addressProfile } from '../../validation/address.validation';

const router = express.Router();

router.post('/', authMiddleware, orderValdation, getUsercart, orderCheckOut) 
router.post('/address', authMiddleware, addressProfile, addOrderAddress) 

export default router