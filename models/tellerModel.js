const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TellerSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username required"],
    },
    staffId: {
      type: String,
      required: [true, "staff ID required"],
    },
    branch: {
      type: String,
      required: [true, "branch required"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

TellerSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const Teller = mongoose.model("teller", TellerSchema);
module.exports = Teller;
