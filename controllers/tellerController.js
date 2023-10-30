const Teller = require("../models/tellerModel");
const bcrypt = require("bcryptjs");

// ADDING TELLER
const addTeller = async (req, res) => {
  let { username, staffId, password, branch, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const isAdminAccount = (await Teller.countDocuments()) === 0;
    //let teller = await Teller.findOne({ staffId });
    // if (teller) {
    //   return res.json({ msg: "Staff ID already in use" });
    // }
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
    res.status(500).json({ msg: err.message });
  }
};
const updateTeller = async (req, res) => {
  const { staffId, password } = req.body;
  const hashedNewPassword = bcrypt.hashSync(password, 8);
  try {
    const teller = await Teller.findOne({ staffId });
    if (!teller) {
      return res.json({ msg: "Staff ID does not exist" });
    }
    let searchTeller = await Teller.findOneAndUpdate(
      teller,
      {
        password: hashedNewPassword,
      },
      { new: true }
    );
    res.json({ msg: "Password Updated", searchTeller });
  } catch (error) {}
};
const deleteTeller = async (req, res) => {
  const { staffId } = req.body;
  try {
    const teller = await Teller.findOne({ staffId });
    if (!teller) {
      return res.json({ msg: "Staff ID does not exist" });
    }
    const deleted = await Teller.deleteOne({ _id: teller._id });
    if (!deleted) {
      throw Error("Failed to delete User");
    }
    res.json({ msg: "User deleted", deleted });
  } catch (error) {
    console.log(error.message);
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
    res
      .status(200)
      .json({ msg: "Log in successful", user: teller.role, teller });
    // .json({ msg: "Log in successful", user: teller._id, role: teller.role });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};
module.exports = {
  addTeller,
  deleteTeller,
  login,
  updateTeller,
};
