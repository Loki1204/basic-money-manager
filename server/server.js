import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";

import transactionsRoute from "./routes/transactions.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/transactions", transactionsRoute);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Basic Money Manager API");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
