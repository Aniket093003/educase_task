import express from "express";
import  dotenv  from "dotenv";
import schoolRoutes from './routes/school.js';
import connectDB from "./db/index.js"
connectDB();
dotenv.config();


const app = express();
app.use(express.json());

app.use('/api/schools', schoolRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
