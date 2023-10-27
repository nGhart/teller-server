const mongoose = require("mongoose");

const TellerSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username required"],
      unique: true,
    },
    staffId: {
      type: String,
      required: [true, "staff ID required"],
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
  },
  { timestamps: true }
);

const Teller = mongoose.model("teller", TellerSchema);
module.exports = Teller;

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const TellerSchema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "username required"],
//       unique: true,
//     },
//     staffId: {
//       type: String,
//       required: [true, "staff ID required"],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     role: {
//       type: String,
//       // enum: ["admin", "user"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// TellerSchema.pre("save", async function (next) {
//   const teller = this;
//   if (!teller.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt();
//     teller.password = await bcrypt.hash(teller.password, salt);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// TellerSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// const Teller = mongoose.model("Teller", TellerSchema);
// module.exports = Teller;
