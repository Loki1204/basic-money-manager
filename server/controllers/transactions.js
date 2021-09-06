import Transaction from "../models/Transactions.js";

// @desc Get all transactions
// @route GET /transactions
//  @access Public
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Add transactions
// @route POST /transactions
//  @access Public
export const addTransaction = async (req, res, next) => {
  try {
    const { text, amount, creator } = req.body;

    const newTransaction = await Transaction.create({
      text,
      amount,
      creator,
    });

    return res.status(201).json({
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc Delete transaction
// @route DELETE /transactions/:id
//  @access Public
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
