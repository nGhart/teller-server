const router = require("express").Router();
const { addTeller, login } = require("../controllers/tellerController");

router.post("/", addTeller);
router.post("/login", login);

module.exports = router;
