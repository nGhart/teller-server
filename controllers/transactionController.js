const Transaction = require("../models/transactionModel");

//get every transaction in database
const getAllTransactions = async (req, res) => {
  try {
    let transactions = await Transaction.find({});
    return res.json(transactions);
  } catch (error) {
    console.log(error.message);
  }
};

//get transaction by staff id
const getTransactionsByStaff = async (req, res) => {
  const { data } = req.body;
  //find if any transaction by the teller and return
  try {
    let transactions = await Transaction.find().where("staffId").equals(data);
    if (!transactions) {
      return res.status(404).json({ msg: "Staff ID not found" });
    }
    return res.json(transactions);
  } catch (error) {
    console.log(error.message);
  }
};

//filter transactions by type, account number and staff ID
const getSingleAccount = async (req, res) => {
  //get data from form
  const { accountNumber, transactionType, staffId } = req.body;

  //get filter values
  try {
    const query = {};

    if (accountNumber) {
      query.accountNumber = accountNumber;
    }

    if (transactionType) {
      query.transactionType = transactionType;
    }
    if (staffId) {
      query.staffId = staffId;
    }

    //find data that match the query and return
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
  getAllTransactions,
  getTransactionsByStaff,
  getSingleAccount,
};
