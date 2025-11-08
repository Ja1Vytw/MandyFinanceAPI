import mongoose, { Schema, Document } from 'mongoose';
import { PartnerRole, DueDateType } from '../types';

export interface IDueDate extends Document {
  name: string;
  dayOfMonth: number;
  amount: number;
  type: DueDateType;
  owner: PartnerRole;
  referenceId?: string;
}

const DueDateSchema = new Schema<IDueDate>({
  name: { type: String, required: true },
  dayOfMonth: { type: Number, required: true, min: 1, max: 31 },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['bill', 'installment', 'income'], required: true },
  owner: { type: String, enum: ['partner1', 'partner2', 'joint'], required: true },
  referenceId: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IDueDate>('DueDate', DueDateSchema);

