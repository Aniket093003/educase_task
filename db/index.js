import mongoose from "mongoose";
import DB_NAME from "../constant.js";
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`,{
        });
        console.log(`\n MongoDB connected !! DB HOST : `);
    }
    catch(err){
        console.log("MONGODB connection FAILED", err);
      process.exit(1);
    }
};
export default connectDB;