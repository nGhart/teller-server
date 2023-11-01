const Teller = require("../models/tellerModel");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
    if (error) {
      return res.json({ status: false });
    } else {
      const teller = await Teller.findById(data.id);
      if (teller) return res.json({ status: true, teller: teller.staffId });
      else return res.json({ status: false });
    }
  });
};
