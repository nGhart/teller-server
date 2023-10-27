const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    accNumber: {
      type: String,
      unique: true,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    contact: { type: String },
    accountType: { type: String },
    idType: { type: String, required: true },
    idNumber: { type: String, required: true },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
