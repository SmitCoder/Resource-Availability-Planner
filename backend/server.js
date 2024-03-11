const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();

const employeeRoutes = require("./routes/employeeRoutes");
const teamsRoutes = require("./routes/teamsRoutes");
// const main = require("./controllers/main");
const matrix = require("./controllers/matrix");
const department = require("./controllers/department");
const departmentRoutes = require("./routes/departmentRoutes")
const matrixRoutes = require("./routes/matrixRoutes")
const config = {
  user: "smit",
  password: "hello123",
  server: "localhost\\SQLEXPRESS",
  database: "Students",
  port: "5000",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

app.use(cors());
app.use(express.json());

app.use( "/", matrixRoutes);
app.use("/" , departmentRoutes)
app.use("/", teamsRoutes);

app.post("/sendMembers", (req, res) => {
  const { selectedMember , teamid , team_Name } = req.body;
  console.log(selectedMember);
  console.log(teamid , team_Name);
  const data = selectedMember
   
  // Flatten the array of arrays
  const flattenedArray = data.flat();
  
  // Filter out duplicate objects based on their value property
  const uniqueArray = flattenedArray.filter((obj, index, self) =>
    index === self.findIndex((o) => o.value === obj.value)
  );
  
  console.log(uniqueArray);
  const insertQuery = "INSERT INTO Mapping (Team_id, Employee_id) VALUES (@teamid, @value)";
  const values = uniqueArray.map(({  value }) => [ teamid ,value]);
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    // uniqueArray.forEach(({ values }) => {
    //   request.input("teamid", sql.Int, teamid);
    //   request.input("value", sql.NVarChar, value);
    //   request.query(insertQuery,[values], function (err, recordset) {
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).send("Internal Server Error");
    //     }
    //   });
      
    values.forEach(([teamid, value]) => {
      request.input("teamid", sql.Int, teamid);
      request.input("value", sql.NVarChar, value);
      request.query(insertQuery, function (err, recordset) {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
      });

    console.log("Data inserted into the database:", uniqueArray);
    // res.status(200).json({ message: "Data inserted successfully." });
      // res.json(recordset);
    });
  });
  
});
app.use("/", employeeRoutes);



app.get("/select", (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    request.query("select * from tblTeam ", function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      res.json(recordset);
    });
  });
});


const groupData = (data) => {
  const grouped = {};
  data.recordset.forEach((record) => {
    const name = record.Name;
    const id = record.Personid;
    // console.log("Processing record with Name:", name);

    if (!grouped[name]) {
      grouped[name] = {
        name: name,
        id: id,
        dates: [],
      };
    }
    grouped[name].dates.push({
      fromDate: record.FromDate,
      toDate: record.ToDate,
      leavetype: record.LeaveID,
      appldays: record.APPLDays,
      modifyfrom: record.ModifyFromHalf,
      modifyto: record.ModifyToHalf,
    });
  });

  return Object.values(grouped);
};

app.get("/", (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    request.query("select * from Sheet2$ ", function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }
      const groupedData = groupData(recordset);

      res.json(groupedData);
    });
  });
});

app.post("/COSEC", (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    request.query("select * from tblExtLeaves", function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }
      const groupedData = groupData(recordset);
      // send records as a response
      res.json(groupedData);

      // console.log("data is sended from cosec");
      // res.end();
      // console.log("connectio ended");
      //   console.log(recordset);
    });
  });
});

app.post("/", (req, res) => {
  const {
    startDate,
    endDate,
    searchQuery,
    input,
    selectedDate,
    selectedEmployee,
  } = req.body;

  // Log the received dates

  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database connection error" });
    }

    const request = new sql.Request();

    // SQL query based on received dates and search query
    let query = "SELECT * FROM COSEC WHERE 1=1";
    if (startDate) query += ` AND FromDate >= '${startDate}'`;
    if (endDate) query += ` AND ToDate <= '${endDate}'`;

    request.query(query, function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query error" });
      }
      const groupedData = groupData(recordset);
      res.send(groupedData);
      //   res.end();
      //   console.log(groupedData);
    });
  });
});

app.post("/submitFormData", async (req, res) => {
  const { name, fromDate, toDate, leaveType } = req.body;

  const formData = [
    {
      Name: name,
      FromDate: fromDate,
      ToDate: toDate,
      LeaveID: leaveType,
    },
  ];
  sql.connect(config, function (err, recordset) {
    if (err) {
      console.log(err);
    }

    let request = new sql.Request();
    const insertQuery = `INSERT INTO tblExtLeaves (Name, FromDate, ToDate, LeaveID) VALUES ('${name}', '${fromDate}', '${toDate}', '${leaveType}')`;

    request.query(insertQuery, function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query error" });
      }
    });
  });

  const groupedData = groupData({ recordset: formData });

  res.send(groupedData);
});

app.listen(5000, function () {
  console.log("Server is running on port 5000");
});
