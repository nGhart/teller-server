const router = require("express").Router();
const {
  deposit,
  getAccounts,
  withdraw,
  addAccount,
} = require("../controllers/accountController");

router.get("/", getAccounts);
router.post("/addNew", addAccount);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);

module.exports = router;
