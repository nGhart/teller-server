const router = require("express").Router();
const {
  addTeller,
  login,
  deleteTeller,
  updateTeller,
  changePassword,
} = require("../controllers/tellerController");
const { verifyUser } = require("../middlewares/requireAuth");

router.post("/", verifyUser);
router.post("/signup", addTeller);
router.post("/login", login);
router.post("/delete", deleteTeller);
router.patch("/update", updateTeller);
router.patch("/change", changePassword);

module.exports = router;
