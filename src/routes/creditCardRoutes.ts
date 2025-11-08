import { Router } from 'express';
import {
  getCreditCards,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
} from '../controllers/creditCardController';

const router = Router();

router.get('/', getCreditCards);
router.post('/', createCreditCard);
router.put('/:id', updateCreditCard);
router.delete('/:id', deleteCreditCard);

export default router;

