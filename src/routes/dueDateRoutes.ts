import { Router } from 'express';
import {
  getDueDates,
  createDueDate,
  updateDueDate,
  deleteDueDate,
} from '../controllers/dueDateController';

const router = Router();

router.get('/', getDueDates);
router.post('/', createDueDate);
router.put('/:id', updateDueDate);
router.delete('/:id', deleteDueDate);

export default router;

