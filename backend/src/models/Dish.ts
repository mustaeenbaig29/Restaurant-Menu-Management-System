import mongoose, { Schema, Document } from 'mongoose';

export interface IDish extends Document {
  name: string;
  description: string;
  cuisine: string;
  price: number;
  image: string;
}

const DishSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cuisine: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

export default mongoose.model<IDish>('Menu', DishSchema);