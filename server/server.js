import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import transactions from "./routes/transactions.js";
import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
