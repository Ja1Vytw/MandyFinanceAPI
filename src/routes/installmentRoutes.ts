import { Router } from 'express';
import {
  getInstallmentPurchases,
  createInstallmentPurchase,
  updateInstallmentPurchase,
  deleteInstallmentPurchase,
  getInstallments,
  updateInstallment,
} from '../controllers/installmentController';

const router = Router();

router.get('/purchases', getInstallmentPurchases);
router.post('/purchases', createInstallmentPurchase);
router.put('/purchases/:id', updateInstallmentPurchase);
router.delete('/purchases/:id', deleteInstallmentPurchase);

router.get('/installments', getInstallments);
router.put('/installments/:id', updateInstallment);

export default router;

