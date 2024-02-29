const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema({
  name: String,
  leavesDates: [
    {
      fromDate: Date,
      toDate: Date,
      leaveType: String,
    },
  ],
});

module.exports = mongoose.model("Employee", employeSchema, "finalLeaves");
