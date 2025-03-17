import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  await mongoose.connect(process.env.Mongo).then(()=>{console.log("MongoDB Connected");})

}
export default connectDB;