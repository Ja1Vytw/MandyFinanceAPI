import mongoose, { Schema, Document } from 'mongoose';

export interface ICreditCard extends Document {
  holder: 'partner1' | 'partner2';
  cardName: string;
  limit: number;
  available: number;
  invoiceAmount: number;
  invoiceDueDate: string;
  invoiceStatus?: 'pending' | 'paid'; // Status da fatura (pendente ou paga)
  color?: string; // Cor do cartão para visualização
}

const CreditCardSchema = new Schema<ICreditCard>({
  holder: { type: String, enum: ['partner1', 'partner2'], required: true },
  cardName: { type: String, required: true },
  limit: { type: Number, required: true },
  available: { type: Number, required: true },
  invoiceAmount: { type: Number, required: true },
  invoiceDueDate: { type: String, required: true },
  invoiceStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  color: { type: String, default: 'blue' },
}, {
  timestamps: true,
});

export default mongoose.model<ICreditCard>('CreditCard', CreditCardSchema);

