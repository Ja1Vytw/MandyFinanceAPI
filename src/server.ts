import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Routes
import transactionRoutes from './routes/transactionRoutes';
import billRoutes from './routes/billRoutes';
import creditCardRoutes from './routes/creditCardRoutes';
import investmentRoutes from './routes/investmentRoutes';
import recurringIncomeRoutes from './routes/recurringIncomeRoutes';
import installmentRoutes from './routes/installmentRoutes';
import dueDateRoutes from './routes/dueDateRoutes';
import userRoutes from './routes/userRoutes';
import financialDataRoutes from './routes/financialDataRoutes';

// Middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const defaultAllowedOrigins = ['http://localhost:3000'];
const envAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/credit-cards', creditCardRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/recurring-incomes', recurringIncomeRoutes);
app.use('/api/installments', installmentRoutes);
app.use('/api/due-dates', dueDateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/financial-data', financialDataRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

