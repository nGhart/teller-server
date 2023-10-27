const Teller = require("../models/tellerModel");
const bcrypt = require("bcryptjs");

// ADDING TELLER
const addTeller = async (req, res) => {
  let { username, staffId, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    let newTeller = await Teller.create({
      username,
      staffId,
      password: hashedPassword,
      role,
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
    res.status(200).json({ msg: "Log in successful" });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};
module.exports = {
  addTeller,
  login,
};

// const Teller = require("../models/tellerModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // ADDING TELLER
// const addTeller = async (req, res, next) => {
//   const { username, staffId, password, role } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 8);
//     const newTeller = new Teller({
//       username,
//       staffId,
//       password: hashedPassword,
//       role,
//     });
//     await newTeller.save();
//     res.json({ msg: "User successfully created" });
//   } catch (err) {
//     next(err);
//     //res.json({ msg: err.message });
//   }
// };

// const login = async (req, res, next) => {
//   const { staffId, password } = req.body;
//   try {
//     const teller = await Teller.findOne({ staffId });
//     if (!teller) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     //if user found
//     const comparePassword = await teller.comparePassword(password);
//     if (!comparePassword) {
//       return res.status(401).json({ msg: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1 hour",
//     });

//     res.json({ token, msg: "Log in successful" });
//   } catch (error) {
//     next(error);
//     res.status(401).json({ msg: error.message });
//   }
// };
// module.exports = {
//   addTeller,
//   login,
// };
