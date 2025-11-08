import { Request, Response } from 'express';
import CreditCard from '../models/CreditCard';
import { formatDocument, formatDocuments } from '../utils/formatData';

export const getCreditCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const creditCards = await CreditCard.find();
    res.json(formatDocuments(creditCards));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching credit cards' });
  }
};

export const createCreditCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const creditCard = new CreditCard(req.body);
    const savedCreditCard = await creditCard.save();
    res.status(201).json(formatDocument(savedCreditCard));
  } catch (error) {
    res.status(400).json({ error: 'Error creating credit card' });
  }
};

export const updateCreditCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const creditCard = await CreditCard.findByIdAndUpdate(id, req.body, { new: true });
    if (!creditCard) {
      res.status(404).json({ error: 'Credit card not found' });
      return;
    }
    res.json(formatDocument(creditCard));
  } catch (error) {
    res.status(400).json({ error: 'Error updating credit card' });
  }
};

export const deleteCreditCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const creditCard = await CreditCard.findByIdAndDelete(id);
    if (!creditCard) {
      res.status(404).json({ error: 'Credit card not found' });
      return;
    }
    res.json({ message: 'Credit card deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting credit card' });
  }
};

