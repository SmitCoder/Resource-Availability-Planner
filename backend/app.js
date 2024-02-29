const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();
var sql = require("mssql");
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/LMS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use Routes
app.use("/employees", employeeRoutes);
app.post("/", (req, res) => {
  res.send("rquest received");
  const date = req.body.endDate;
  const date2 = req.body.startDate;
  const searchQuery = req.body.searchQuery;

  // console.log("received");
  // console.log(`start date ${date2}.toString()`);
  console.log(`end date ${date}`.toString());
  console.log(`start date ${date2}`.toString());
  console.log(searchQuery);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
