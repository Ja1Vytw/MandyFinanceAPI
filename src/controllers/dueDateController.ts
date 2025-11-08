import { Request, Response } from 'express';
import DueDate from '../models/DueDate';
import { formatDocument, formatDocuments } from '../utils/formatData';

export const getDueDates = async (req: Request, res: Response): Promise<void> => {
  try {
    const dueDates = await DueDate.find().sort({ dayOfMonth: 1 });
    res.json(formatDocuments(dueDates));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching due dates' });
  }
};

export const createDueDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const dueDate = new DueDate(req.body);
    const savedDueDate = await dueDate.save();
    res.status(201).json(formatDocument(savedDueDate));
  } catch (error) {
    res.status(400).json({ error: 'Error creating due date' });
  }
};

export const updateDueDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dueDate = await DueDate.findByIdAndUpdate(id, req.body, { new: true });
    if (!dueDate) {
      res.status(404).json({ error: 'Due date not found' });
      return;
    }
    res.json(formatDocument(dueDate));
  } catch (error) {
    res.status(400).json({ error: 'Error updating due date' });
  }
};

export const deleteDueDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dueDate = await DueDate.findByIdAndDelete(id);
    if (!dueDate) {
      res.status(404).json({ error: 'Due date not found' });
      return;
    }
    res.json({ message: 'Due date deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting due date' });
  }
};

