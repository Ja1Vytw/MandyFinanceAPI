import mongoose, { Schema, Document } from 'mongoose';
import { PartnerRole } from '../types';

export interface IInvestment extends Document {
  name: string;
  type: string;
  amount: number;
  currentValue: number;
  owner: PartnerRole;
}

const InvestmentSchema = new Schema<IInvestment>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  owner: { type: String, enum: ['partner1', 'partner2', 'joint'], required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IInvestment>('Investment', InvestmentSchema);

