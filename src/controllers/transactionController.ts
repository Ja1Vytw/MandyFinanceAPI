import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { formatDocument, formatDocuments } from '../utils/formatData';

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(formatDocuments(transactions));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    res.status(201).json(formatDocument(savedTransaction));
  } catch (error) {
    res.status(400).json({ error: 'Error creating transaction' });
  }
};

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json(formatDocument(transaction));
  } catch (error) {
    res.status(400).json({ error: 'Error updating transaction' });
  }
};

export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting transaction' });
  }
};

