const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    accountNumber: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    branch: { type: String, required: true },
    transactionType: { type: String, required: true },
    accountType: { type: String, required: true },
    amount: { type: Number, required: true },
    idType: { type: String, required: true },
    success: { type: String },
    idNumber: { type: String, required: true },
    idVerified: { type: String, required: true },
    accountName: { type: String, required: true },
    paymentType: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teller",
    },
  },

  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
