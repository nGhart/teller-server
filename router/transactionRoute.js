const router = require("express").Router();
const {
  //createTransaction,
  getAllTransactions,
  getSingleAccount,
} = require("../controllers/transactionController");

// router.post("/", createTransaction);
router.get("/", getAllTransactions);
router.post("/getAccount", getSingleAccount);

module.exports = router;
