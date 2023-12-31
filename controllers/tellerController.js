const Teller = require("../models/tellerModel");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../utilities/Token");

// Create new teller
const addTeller = async (req, res, next) => {
  //encrypt password
  //const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    //admin creation
    const isAdminAccount = (await Teller.countDocuments()) === 0;

    //get details from request
    const { username, staffId, password, branch, role } = req.body;

    //find if staff ID already exists
    const teller = await Teller.findOne().where("staffId").equals(staffId);
    if (teller) {
      return res.json({ msg: "Staff ID already in use" });
    }
    //create new teller
    const newTeller = await Teller.create({
      username,
      staffId,
      branch,
      password,
      role: isAdminAccount ? "admin" : "user",
    });
    const token = createSecretToken(newTeller._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ newTeller, msg: "New user added", success: true, newTeller });
    next();
  } catch (err) {
    //res.status(500).json({ msg: err.message });
    console.log(err);
  }
};

//recover password
const updateTeller = async (req, res) => {
  //get data from form
  const { staffId, password } = req.body;
  //encrypt password
  const hashedNewPassword = bcrypt.hashSync(password, 8);
  try {
    //find if user exists
    const teller = await Teller.findOne({ staffId });
    if (!teller) {
      return res.json({ msg: "Staff ID does not exist" });
    }
    //replace old password with new
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

//change password
const changePassword = async (req, res) => {
  //get data from form
  const { staffId, password, newPassword } = req.body;
  //encrypt password
  const hashedNewPassword = bcrypt.hashSync(newPassword, 8);
  try {
    //check if user exists
    const teller = await Teller.findOne({ staffId });
    if (!teller) {
      return res.json({ msg: "Staff ID does not exist" });
    }
    //compare teller password in database with password in form
    const comparePassword = bcrypt.compareSync(password, teller.password);
    if (!comparePassword) {
      return res.json({ msg: "Invalid credentials" });
    }
    //replace old password with encrypted newPassword
    let changedTeller = await Teller.findOneAndUpdate(
      teller,
      {
        password: hashedNewPassword,
      },
      { new: true }
    );
    res.json({ msg: "Password Updated", changedTeller });
  } catch (error) {}
};

//delete Teller
const deleteTeller = async (req, res) => {
  //get data from form
  const { staffId } = req.body;
  console.log(req.body);
  try {
    //check if staff ID exists
    let checkStaffId = await Teller.findOne().where("staffId").equals(staffId);
    if (!checkStaffId) {
      return res.json({ msg: "Staff ID not found" });
    }
    //delete document matching staff ID from form
    let deleted = await Teller.deleteOne().where("staffId").equals(staffId);
    if (deleted) {
      return res.json({ msg: "Deleted successfully" });
    } else {
      return res.json({ msg: "Failed" });
    }
  } catch (err) {
    console.log(err);
  }

  // try {
  //   console.log(staffId);
  //   const teller = await Teller.findOne({ staffId: staffId });
  //   //console.log(teller);
  //   if (!teller) {
  //     return res.json({ msg: "Staff ID does not exist" });
  //   }
  //   const deleted = await Teller.deleteOne({ _id: teller._id });
  //   if (!deleted) {
  //     throw Error("Failed to delete User");
  //   }
  //   res.json({ msg: "User deleted", deleted });
  // } catch (error) {
  //   console.log(error.message);
  // }
};

//login
const login = async (req, res, next) => {
  try {
    //get data from form
    const { staffId, password } = req.body;
    //find user exists
    const teller = await Teller.findOne({ staffId });
    if (!teller) return res.json({ msg: "User not found" });

    //if user found compare password entered to password in database
    const comparePassword = bcrypt.compareSync(password, teller.password);
    if (!comparePassword) return res.json({ msg: "Invalid credentials" });
    const token = createSecretToken(teller._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    //log user in and send data to frontend
    res.status(200).json({
      msg: "Log in successful",
      success: true,
      user: teller.role,
      staffId: teller.staffId,
      teller,
    });
    next();
  } catch (error) {
    //res.status(401).json({ msg: error.message });
    console.log(error);
  }
};

module.exports = {
  addTeller,
  changePassword,
  deleteTeller,
  login,
  updateTeller,
};
