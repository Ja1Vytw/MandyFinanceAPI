import mongoose, { Schema, Document } from 'mongoose';
import { PartnerRole, TransactionType } from '../types';

export interface ITransaction extends Document {
  description: string;
  amount: number;
  category: string;
  date: string;
  origin: PartnerRole;
  type: TransactionType;
}

const TransactionSchema = new Schema<ITransaction>({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  origin: { type: String, enum: ['partner1', 'partner2', 'joint'], required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
}, {
  timestamps: true,
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);

