const router = require("express").Router();
const {
  getAllTransactions,
  getSingleAccount,
  getTransactionsByStaff,
} = require("../controllers/transactionController");

router.get("/", getAllTransactions);
router.post("/getAccount", getSingleAccount);
router.post("/stafftrans", getTransactionsByStaff);

module.exports = router;
