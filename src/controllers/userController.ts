import { Request, Response } from 'express';
import User from '../models/User';
import { formatDocuments } from '../utils/formatData';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(formatDocuments(users));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

