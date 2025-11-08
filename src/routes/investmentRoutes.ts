import { Router } from 'express';
import {
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment,
} from '../controllers/investmentController';

const router = Router();

router.get('/', getInvestments);
router.post('/', createInvestment);
router.put('/:id', updateInvestment);
router.delete('/:id', deleteInvestment);

export default router;

