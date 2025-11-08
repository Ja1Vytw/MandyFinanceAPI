import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  role: 'partner1' | 'partner2';
}

const UserSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['partner1', 'partner2'], required: true },
});

export default mongoose.model<IUser>('User', UserSchema);

