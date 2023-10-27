const Account = require("../models/accountModel");
const transactionModel = require("../models/transactionModel");

const getOwners = async (req, res) => {
  let owners = await Account.find({});
  res.json(owners);
};

const addOwner = async (req, res) => {
  try {
    let data = req.body;
    let newOwner = await Account.create(data);
    if (!newOwner) {
      throw Error("Failed to create owner");
    }
    res.json(newOwner);
  } catch (err) {
    res.json({ msg: err.message });
  }
};

// ADD ADD TO BALANCE
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
  } = req.body;
  try {
    // Convert the amount value to a number
    const amountToAdd = Number(amount);

    // Find the existing business document
    const owner = await Account.findOne({ accNumber: accNumber });

    if (!owner) {
      return res.json({ msg: "No business found" });
    }

    // Calculate the new balance
    const newBalance = owner.balance + amountToAdd;

    // Update the balance in the database
    const updatedOwner = await Account.updateOne(
      { accNumber: accNumber },
      { $set: { balance: newBalance } }
    );
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
      });
      res.json({
        msg: `An amount of ${amountToAdd} has been credited to your account`,
      });
    }
  } catch (err) {
    res.json({ msg: err.message });
  }
};

// withdraw

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
  } = req.body;
  try {
    // Convert the amount value to a number
    const amountToAdd = Number(amount);

    // Find the existing business document
    const owner = await Account.findOne({ accNumber: accNumber });

    if (!owner) {
      return res.json({ msg: "Account not found" });
    }

    if (owner.balance <= amountToAdd) {
      return res.status(500).json({ msg: "Insufficient funds" });
    }
    // Calculate the new balance
    const newBalance = owner.balance - amountToAdd;

    // Update the balance in the database
    const updatedOwner = await Account.updateOne(
      { accNumber: accNumber },
      { $set: { balance: newBalance } }
    );
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
      });
      return res.json({
        msg: `An amount of ${amountToAdd} has been debited to your account`,
      });
    }
    res.json(updatedOwner);
  } catch (err) {
    res.json({ msg: err.message });
  }
};

module.exports = {
  deposit,
  getOwners,
  withdraw,
  addOwner,
};
