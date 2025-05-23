import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToCanceled,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/order.controller.js'
import { protect, admin } from '../middleware/auth.middleware.js'

router.route('/')
      .get(protect, admin, getOrders)
      .post(protect, addOrderItems);

router.route('/myorders')
      .get(protect, getMyOrders);

router.route('/:id')
      .get(protect, getOrderById);

router.route('/:id/pay')
      .put(protect, updateOrderToPaid);

router.route('/:id/cancel')
      .put(protect, updateOrderToCanceled);

router.route('/:id/deliver')
      .put(protect, admin, updateOrderToDelivered);

export default router
