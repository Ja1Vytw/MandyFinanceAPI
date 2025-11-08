import { Request, Response } from 'express';
import User from '../models/User';
import Transaction from '../models/Transaction';
import Bill from '../models/Bill';
import CreditCard from '../models/CreditCard';
import Investment from '../models/Investment';
import RecurringIncome from '../models/RecurringIncome';
import InstallmentPurchase from '../models/InstallmentPurchase';
import Installment from '../models/Installment';
import DueDate from '../models/DueDate';
import { formatDocuments } from '../utils/formatData';

export const getFinancialData = async (req: Request, res: Response): Promise<void> => {
  try {
    const [users, transactions, bills, creditCards, investments, recurringIncomes, installmentPurchases, installments, dueDates] = await Promise.all([
      User.find(),
      Transaction.find(),
      Bill.find(),
      CreditCard.find(),
      Investment.find(),
      RecurringIncome.find(),
      InstallmentPurchase.find(),
      Installment.find(),
      DueDate.find(),
    ]);

    res.json({
      users: formatDocuments(users),
      transactions: formatDocuments(transactions),
      bills: formatDocuments(bills),
      creditCards: formatDocuments(creditCards),
      investments: formatDocuments(investments),
      recurringIncomes: formatDocuments(recurringIncomes),
      installmentPurchases: formatDocuments(installmentPurchases),
      installments: formatDocuments(installments),
      dueDates: formatDocuments(dueDates),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching financial data' });
  }
};

