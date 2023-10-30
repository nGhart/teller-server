const Teller = require("../models/tellerModel");
const bcrypt = require("bcryptjs");

// ADDING TELLER
const addTeller = async (req, res) => {
  let { username, staffId, password, branch, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const isAdminAccount = (await Teller.countDocuments()) === 0;
    let newTeller = await Teller.create({
      username,
      staffId,
      branch,
      password: hashedPassword,
      role: isAdminAccount ? "admin" : "user",
    });
    if (!newTeller) {
      return res.json("User creation failed");
    }
    res.json(newTeller);
  } catch (err) {
    res.json({ msg: err.message });
  }
};

const login = async (req, res) => {
  const { staffId, password } = req.body;
  try {
    const teller = await Teller.findOne({ staffId });
    if (!teller) return res.status(404).json({ msg: "User not found" });

    //if user found
    const comparePassword = bcrypt.compareSync(password, teller.password);
    if (!comparePassword)
      return res.status(401).json({ msg: "Invalid credentials" });
    //res.status(200).json({ msg: "Log in successful", teller });
    res.status(200).json({ msg: "Log in successful", user: teller });
    // .json({ msg: "Log in successful", user: teller._id, role: teller.role });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};
module.exports = {
  addTeller,
  login,
};
