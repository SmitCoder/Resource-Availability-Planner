const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  type: String,
  leaveFrom: Date,
  leaveTo: Date,
});

module.exports = mongoose.model("Leave", leaveSchema);
