import mongoose, { Schema, Document } from 'mongoose';
import { PartnerRole } from '../types';

export interface IInstallmentPurchase extends Document {
  description: string;
  totalAmount: number;
  installments: number;
  installmentAmount: number;
  origin: PartnerRole;
  category: string;
  startDate: string;
  status: 'active' | 'completed';
  creditCardId?: string; // ID do cartão de crédito usado (opcional)
}

const InstallmentPurchaseSchema = new Schema<IInstallmentPurchase>({
  description: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  installments: { type: Number, required: true, min: 1 },
  installmentAmount: { type: Number, required: true },
  origin: { type: String, enum: ['partner1', 'partner2', 'joint'], required: true },
  category: { type: String, required: true },
  startDate: { type: String, required: true },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  creditCardId: { type: String, required: false },
}, {
  timestamps: true,
});

export default mongoose.model<IInstallmentPurchase>('InstallmentPurchase', InstallmentPurchaseSchema);

