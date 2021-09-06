import express from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../controllers/transactions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", auth, addTransaction);
router.delete("/:id", auth, deleteTransaction);

export default router;
