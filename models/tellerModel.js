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
    branch: {
      type: String,
      required: [true, "branch required"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Teller",
    },
  },
  { timestamps: true }
);

const Teller = mongoose.model("teller", TellerSchema);
module.exports = Teller;
