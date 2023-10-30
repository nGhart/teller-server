const router = require("express").Router();
const {
  addTeller,
  login,
  deleteTeller,
} = require("../controllers/tellerController");

router.post("/", addTeller);
router.post("/login", login);
router.delete("/delete", deleteTeller);

module.exports = router;
