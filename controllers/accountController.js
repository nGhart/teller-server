const Account = require("../models/accountModel");
const transactionModel = require("../models/transactionModel");

//fetch all account
const getAccounts = async (req, res) => {
  let accounts = await Account.find({});
  res.json(accounts);
};

//create new account
const addAccount = async (req, res) => {
  try {
    let data = req.body;
    let newAccount = await Account.create(data);
    if (!newAccount) {
      throw Error("Failed to create owner");
    }
    res.json(newAccount);
  } catch (err) {
    res.json({ msg: err.message });
  }
};

// make a deposit
const deposit = async (req, res) => {
  const {
    accNumber,
    amount,
    name,
    contact,
    branch,
    accountType,
    idType,
    success,
    idNumber,
    accountName,
    paymentType,
    idVerified,
    createdBy,
  } = req.body;
  try {
    // Convert the amount value to a number
    const amountToAdd = Number(amount);

    // Find if account exists
    const owner = await Account.findOne({ accNumber: accNumber });

    if (!owner) {
      return res.json({ msg: "Account not found" });
    }
    //check if entered details match the account
    if (
      owner.name != req.body.accountName ||
      owner.accountType != req.body.accountType
    ) {
      return res.json({ msg: "Account details incorrect" });
    }
    // Calculate the new balance
    const newBalance = owner.balance + amountToAdd;

    // Update the balance in the database
    const updatedOwner = await Account.updateOne(
      { accNumber: accNumber },
      { $set: { balance: newBalance } }
    );

    //add transaction to database
    if (updatedOwner) {
      let depositRecord = transactionModel.create({
        accountNumber: accNumber,
        transactionType: "deposit",
        amount: amountToAdd,
        name: name,
        contact: contact,
        branch: branch,
        accountType: accountType,
        idType: idType,
        idNumber: idNumber,
        status: "success",
        accountName: accountName,
        paymentType: paymentType,
        idVerified: idVerified,
        staffId: createdBy,
      });
      if (!accountType || !idType || !idVerified || !paymentType) {
        res.json({ msg: "Fill in all fields" });
      }
      res.json({
        msg: `Amount has been credited to the account`,
      });
    }
  } catch (err) {
    res.json({ msg: err.message });
  }
};

// withdraw from an account
const withdraw = async (req, res) => {
  const {
    accNumber,
    amount,
    name,
    contact,
    branch,
    accountType,
    idType,
    idNumber,
    accountName,
    paymentType,
    idVerified,
    createdBy,
  } = req.body;
  try {
    // Convert the amount to a number
    const amountToAdd = Number(amount);

    // Find if account exists
    const owner = await Account.findOne({ accNumber: accNumber });

    if (!owner) {
      return res.json({ msg: "Account not found" });
    }
    //check if entered details match account details
    if (
      owner.name != req.body.accountName ||
      owner.accountType != req.body.accountType
    ) {
      return res.json({ msg: "Account details incorrect" });
    }

    //check if account balance is sufficient to process the withdrawal
    if (owner.balance <= amountToAdd) {
      return res.json({ msg: "Insufficient funds" });
    }
    // Calculate the new balance
    const newBalance = owner.balance - amountToAdd;

    // Update the balance in the database
    const updatedOwner = await Account.updateOne(
      { accNumber: accNumber },
      { $set: { balance: newBalance } }
    );
    //add transaction to database
    if (updatedOwner) {
      let depositRecord = transactionModel.create({
        accountNumber: accNumber,
        transactionType: "withdrawal",
        amount: amountToAdd,
        name: name,
        contact: contact,
        branch: branch,
        accountType: accountType,
        idType: idType,
        idNumber: idNumber,
        status: "success",
        accountName: accountName,
        paymentType: paymentType,
        idVerified: idVerified,
        staffId: createdBy,
      });
      if (!accountType || !idType || !idVerified || !paymentType) {
        res.json({ msg: "Fill in all fields" });
      }
      return res.json({
        msg: `Amount has been debited to the account`,
      });
    }
    res.json(updatedOwner);
  } catch (err) {
    res.json({ msg: err.message });
  }
};

module.exports = {
  deposit,
  getAccounts,
  withdraw,
  addAccount,
};
