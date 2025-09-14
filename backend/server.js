import express, { json } from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/dp.js";
import productRouter from './routes/product.routes.js'

import path from "path";


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

const __dirname= path.resolve();


app.use(express.json());


app.use("/api/products", productRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
 
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

console.log(process.env.MONGO_URL);

app.listen(PORT, (res, req) => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});    