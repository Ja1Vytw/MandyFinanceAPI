import { Request, Response } from 'express';
import Bill from '../models/Bill';
import { formatDocument, formatDocuments } from '../utils/formatData';

export const getBills = async (req: Request, res: Response): Promise<void> => {
  try {
    const bills = await Bill.find().sort({ dueDate: 1 });
    res.json(formatDocuments(bills));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bills' });
  }
};

export const createBill = async (req: Request, res: Response): Promise<void> => {
  try {
    const bill = new Bill(req.body);
    const savedBill = await bill.save();
    res.status(201).json(formatDocument(savedBill));
  } catch (error) {
    res.status(400).json({ error: 'Error creating bill' });
  }
};

export const updateBill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const bill = await Bill.findByIdAndUpdate(id, req.body, { new: true });
    if (!bill) {
      res.status(404).json({ error: 'Bill not found' });
      return;
    }
    res.json(formatDocument(bill));
  } catch (error) {
    res.status(400).json({ error: 'Error updating bill' });
  }
};

export const deleteBill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const bill = await Bill.findByIdAndDelete(id);
    if (!bill) {
      res.status(404).json({ error: 'Bill not found' });
      return;
    }
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting bill' });
  }
};

