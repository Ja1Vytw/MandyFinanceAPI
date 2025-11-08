import { Router } from 'express';
import {
  getRecurringIncomes,
  createRecurringIncome,
  updateRecurringIncome,
  deleteRecurringIncome,
} from '../controllers/recurringIncomeController';

const router = Router();

router.get('/', getRecurringIncomes);
router.post('/', createRecurringIncome);
router.put('/:id', updateRecurringIncome);
router.delete('/:id', deleteRecurringIncome);

export default router;

