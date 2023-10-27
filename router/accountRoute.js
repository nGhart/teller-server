const router = require("express").Router();
const {
  deposit,
  getOwners,
  withdraw,
  addOwner,
} = require("../controllers/accountController");

router.get("/", getOwners);
router.post("/addNew", addOwner);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);

module.exports = router;
