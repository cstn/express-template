import mongoose from 'mongoose';

import { config } from '../../config/app.ts';

export async function connectDb() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.MONGO_URL, {
    autoIndex: config.ENV !== 'production',
  });
}

export { mongoose };
