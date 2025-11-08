import { Router } from 'express';
import { getFinancialData } from '../controllers/financialDataController';

const router = Router();

router.get('/', getFinancialData);

export default router;

