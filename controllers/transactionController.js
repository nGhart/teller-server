const Transaction = require("../models/transactionModel");

const getAllTransactions = async (req, res) => {
  try {
    let transactions = await Transaction.find({});
    return res.json(transactions);
  } catch (error) {
    console.log(error.message);
  }
};

const getSingleAccount = async (req, res) => {
  const { accountNumber, transactionType } = req.body;
  try {
    const query = {};

    if (accountNumber) {
      query.accountNumber = accountNumber;
    }

    if (transactionType) {
      query.transactionType = transactionType;
    }

    const singleAccount = await Transaction.find(query);
    if (singleAccount.length === 0) {
      return res.json({ msg: "No matching records found" });
    }
    return res.json(singleAccount);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  //createTransaction,
  getAllTransactions,
  getSingleAccount,
};
