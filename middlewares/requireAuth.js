const jwt = require("jsonwebtoken");
const Teller = require("../models/tellerModel");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split("")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const teller = await Teller.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthenticated" });
  }
};
module.exports = { authenticate };
