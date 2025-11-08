import { Request, Response } from 'express';
import RecurringIncome from '../models/RecurringIncome';
import { formatDocument, formatDocuments } from '../utils/formatData';

export const getRecurringIncomes = async (req: Request, res: Response): Promise<void> => {
  try {
    const recurringIncomes = await RecurringIncome.find();
    res.json(formatDocuments(recurringIncomes));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recurring incomes' });
  }
};

export const createRecurringIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const recurringIncome = new RecurringIncome({
      ...req.body,
      createdAt: new Date().toISOString(),
    });
    const savedRecurringIncome = await recurringIncome.save();
    res.status(201).json(formatDocument(savedRecurringIncome));
  } catch (error) {
    res.status(400).json({ error: 'Error creating recurring income' });
  }
};

export const updateRecurringIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const recurringIncome = await RecurringIncome.findByIdAndUpdate(id, req.body, { new: true });
    if (!recurringIncome) {
      res.status(404).json({ error: 'Recurring income not found' });
      return;
    }
    res.json(formatDocument(recurringIncome));
  } catch (error) {
    res.status(400).json({ error: 'Error updating recurring income' });
  }
};

export const deleteRecurringIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const recurringIncome = await RecurringIncome.findByIdAndDelete(id);
    if (!recurringIncome) {
      res.status(404).json({ error: 'Recurring income not found' });
      return;
    }
    res.json({ message: 'Recurring income deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting recurring income' });
  }
};

