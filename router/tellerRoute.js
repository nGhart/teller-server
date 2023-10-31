const router = require("express").Router();
const {
  addTeller,
  login,
  deleteTeller,
  updateTeller,
} = require("../controllers/tellerController");

router.post("/", addTeller);
router.post("/login", login);
router.post("/delete", deleteTeller);
router.patch("/update", updateTeller);

module.exports = router;
