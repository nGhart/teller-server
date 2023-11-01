const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 24 * 60 * 60,
  });
};
