const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    accountNumber: { type: String },
    name: { type: String },
    contact: { type: String },
    branch: { type: String },
    transactionType: { type: String },
    accountType: { type: String },
    amount: { type: Number },
    idType: { type: String },
    success: { type: Boolean },
    idNumber: String,
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
