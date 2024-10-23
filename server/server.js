import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectMongoDB from "./db/Database.js";  

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());


app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB(); 
});
