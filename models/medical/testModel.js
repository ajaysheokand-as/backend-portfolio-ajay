const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  TestName: {
    type: String,
    // required:true,
    // unique:true,
  },
  Price: {
    type: Number,
    // required:true,
    // unique:true,
  },
  DefaultValue: {
    type: String,
    // required:true,
    // unique:true,
  },
  Unit: {
    type: String,
    // required:true,
    // unique:true,
  },
});
module.exports = mongoose.model("tests", testSchema);
