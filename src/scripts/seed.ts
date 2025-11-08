import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import connectDB from '../config/database';

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    // Verificar se já existem usuários
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
      console.log('Users already exist, skipping seed');
      process.exit(0);
    }

    // Criar usuários iniciais
    const users = [
      { id: '1', name: 'João', role: 'partner1' as const },
      { id: '2', name: 'Amanda', role: 'partner2' as const },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();

