import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

mongoose.connect(
  `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASSWORD}@${process.env.MONGODBHOST}/${process.env.MONGODBDATABASE}`,
  {
    authMechanism: 'DEFAULT',
    authSource: 'admin',
  }
);

export default mongoose;