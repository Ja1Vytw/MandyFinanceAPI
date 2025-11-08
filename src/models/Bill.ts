import mongoose, { Schema, Document } from 'mongoose';
import { PartnerRole } from '../types';

export interface IBill extends Document {
  name: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid';
  owner: PartnerRole;
}

const BillSchema = new Schema<IBill>({
  name: { type: String, required: true },
  dueDate: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  owner: { type: String, enum: ['partner1', 'partner2', 'joint'], required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IBill>('Bill', BillSchema);

