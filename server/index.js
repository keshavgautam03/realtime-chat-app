import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const databaseUrl=process.env.DATABASE_URL;
app.use(
    cors({
        origin: [process.env.ORIGIN],
        methods: ["GET","PUT","POST", "PATCH", "DELETE"],
        credentials:true,
    })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes);
const server = app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
mongoose.connect(databaseUrl)
.then(()=>{
    console.log(`db connection successfull`)
})
.catch((err)=>{
    console.log(`error is ${err.message}`)
})