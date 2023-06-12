const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please Add User Id"],
      ref: "users",
    },
    vehicleNumber: {
      type: String,
      required: [true, "Please add the Vehicle Number"],
    },
    name: {
      type: String,
      required: false,
    },
    mobileNumber: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);