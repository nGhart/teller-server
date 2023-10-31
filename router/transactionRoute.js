const router = require("express").Router();
const {
  //createTransaction,
  getAllTransactions,
  getSingleAccount,
  getTransactionsByStaff,
} = require("../controllers/transactionController");

// router.post("/", createTransaction);
router.get("/", getAllTransactions);
router.post("/getAccount", getSingleAccount);
router.get("/stafftrans", getTransactionsByStaff);

module.exports = router;
