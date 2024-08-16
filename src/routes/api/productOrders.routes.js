import express from 'express'
import { authMiddleware, checkRole } from '../../middlewares/authMiddleware';
import { addOrderAddress, createOrder, getOrderPerId, getOrders, webhookStript } from '../../controllers/order.controller';
import { getUsercart } from '../../middlewares/cart.middleware';
import { addressProfile } from '../../validation/address.validation';

const router = express.Router();

router.post('/', authMiddleware, getUsercart, createOrder) 
router.get('/', authMiddleware,checkRole(['admin','seller']), getOrders) 
router.get('/:id', authMiddleware,checkRole(['admin','seller']), getOrderPerId) 
router.post('/webhook',express.raw({type: 'application/json'}),webhookStript) 
router.post('/address/:id', authMiddleware, addressProfile, addOrderAddress) 

export default router