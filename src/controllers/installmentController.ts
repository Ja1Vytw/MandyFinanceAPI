import { Request, Response } from 'express';
import InstallmentPurchase from '../models/InstallmentPurchase';
import Installment from '../models/Installment';
import CreditCard from '../models/CreditCard';
import { formatDocument, formatDocuments } from '../utils/formatData';

export const getInstallmentPurchases = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchases = await InstallmentPurchase.find();
    res.json(formatDocuments(purchases));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching installment purchases' });
  }
};

export const createInstallmentPurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchase = new InstallmentPurchase(req.body);
    const savedPurchase = await purchase.save();

    // Se um cartão de crédito foi selecionado, atualizar o cartão
    if (req.body.creditCardId) {
      const creditCard = await CreditCard.findById(req.body.creditCardId);
      if (creditCard) {
        // Diminuir o disponível pelo valor total da compra
        creditCard.available = Math.max(0, creditCard.available - req.body.totalAmount);
        // Aumentar o valor da fatura pelo valor total da compra
        creditCard.invoiceAmount = creditCard.invoiceAmount + req.body.totalAmount;
        await creditCard.save();
      }
    }

    // Criar as parcelas individuais
    const startDate = new Date(req.body.startDate);
    const installments = [];
    for (let i = 0; i < req.body.installments; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      const installment = new Installment({
        purchaseId: savedPurchase._id.toString(),
        amount: req.body.installmentAmount,
        dueDate: dueDate.toISOString().split('T')[0],
        paid: false,
      });
      await installment.save();
      installments.push(installment);
    }

    res.status(201).json({ purchase: formatDocument(savedPurchase), installments: formatDocuments(installments) });
  } catch (error) {
    res.status(400).json({ error: 'Error creating installment purchase' });
  }
};

export const updateInstallmentPurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const purchase = await InstallmentPurchase.findByIdAndUpdate(id, req.body, { new: true });
    if (!purchase) {
      res.status(404).json({ error: 'Installment purchase not found' });
      return;
    }
    res.json(formatDocument(purchase));
  } catch (error) {
    res.status(400).json({ error: 'Error updating installment purchase' });
  }
};

export const deleteInstallmentPurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Installment.deleteMany({ purchaseId: id });
    const purchase = await InstallmentPurchase.findByIdAndDelete(id);
    if (!purchase) {
      res.status(404).json({ error: 'Installment purchase not found' });
      return;
    }
    res.json({ message: 'Installment purchase deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting installment purchase' });
  }
};

export const getInstallments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { purchaseId } = req.query;
    const query = purchaseId ? { purchaseId } : {};
    const installments = await Installment.find(query).sort({ dueDate: 1 });
    res.json(formatDocuments(installments));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching installments' });
  }
};

export const updateInstallment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const installment = await Installment.findByIdAndUpdate(id, req.body, { new: true });
    if (!installment) {
      res.status(404).json({ error: 'Installment not found' });
      return;
    }
    res.json(formatDocument(installment));
  } catch (error) {
    res.status(400).json({ error: 'Error updating installment' });
  }
};

