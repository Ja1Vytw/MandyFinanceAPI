import mongoose, { Schema, Document } from 'mongoose';
import { PartnerRole } from '../types';

export interface IRecurringIncome extends Document {
  description: string;
  amount: number;
  category: string;
  dayOfMonth: number;
  origin: PartnerRole;
  enabled: boolean;
  createdAt: string;
}

const RecurringIncomeSchema = new Schema<IRecurringIncome>({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  dayOfMonth: { type: Number, required: true, min: 1, max: 28 },
  origin: { type: String, enum: ['partner1', 'partner2', 'joint'], required: true },
  enabled: { type: Boolean, default: true },
  createdAt: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IRecurringIncome>('RecurringIncome', RecurringIncomeSchema);

