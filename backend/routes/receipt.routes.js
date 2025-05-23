import express from 'express'
const router = express.Router()
import {
  addReceiptItems,
  getReceiptById,
  getReceipts,
} from '../controllers/receipt.controller.js'
import { protect, admin } from '../middleware/auth.middleware.js'

router
  .route('/')
  .post(protect, addReceiptItems)
  .get(protect, admin, getReceipts)
router.route('/:id').get(protect, getReceiptById)

export default router
