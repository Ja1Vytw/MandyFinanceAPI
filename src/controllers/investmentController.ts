import { Request, Response } from 'express';
import Investment from '../models/Investment';
import { formatDocument, formatDocuments } from '../utils/formatData';

export const getInvestments = async (req: Request, res: Response): Promise<void> => {
  try {
    const investments = await Investment.find();
    res.json(formatDocuments(investments));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching investments' });
  }
};

export const createInvestment = async (req: Request, res: Response): Promise<void> => {
  try {
    const investment = new Investment(req.body);
    const savedInvestment = await investment.save();
    res.status(201).json(formatDocument(savedInvestment));
  } catch (error) {
    res.status(400).json({ error: 'Error creating investment' });
  }
};

export const updateInvestment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const investment = await Investment.findByIdAndUpdate(id, req.body, { new: true });
    if (!investment) {
      res.status(404).json({ error: 'Investment not found' });
      return;
    }
    res.json(formatDocument(investment));
  } catch (error) {
    res.status(400).json({ error: 'Error updating investment' });
  }
};

export const deleteInvestment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const investment = await Investment.findByIdAndDelete(id);
    if (!investment) {
      res.status(404).json({ error: 'Investment not found' });
      return;
    }
    res.json({ message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting investment' });
  }
};

