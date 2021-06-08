import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('MongoDB Connected...');

    return connection;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
