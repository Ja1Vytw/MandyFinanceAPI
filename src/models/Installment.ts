import mongoose, { Schema, Document } from 'mongoose';

export interface IInstallment extends Document {
  purchaseId: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  paidDate?: string;
}

const InstallmentSchema = new Schema<IInstallment>({
  purchaseId: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: String, required: true },
  paid: { type: Boolean, default: false },
  paidDate: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IInstallment>('Installment', InstallmentSchema);

