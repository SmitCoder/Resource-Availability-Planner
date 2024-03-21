const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')
const { execSync } = require('child_process');
const os = require('os');


const employeeRoutes = require("./routes/employeeRoutes");
const teamsRoutes = require("./routes/teamsRoutes");
const departmentRoutes = require("./routes/departmentRoutes")
const matrixRoutes = require("./routes/matrixRoutes")
const config = {
  user: "smit",
  password: "hello123",
  server: "localhost\\SQLEXPRESS",
  database: "Students",
  port: "5000",
  options: {
    trustedConnection: false,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};
// In your Node.js/Express.js backend

app.use(cookieParser())
const uuid = require('uuid'); // You may need to install this package using npm or yarn

// Middleware to generate a unique identifier for each client
// app.use((req, res, next) => {
//   if (!req.cookies.machineId) {
//     const machineId = uuid.v4(); // Generate a UUID for the machine
//     res.cookie('machineId', machineId, { maxAge: 900000, httpOnly: true }); // Set the machineId cookie
//     req.machineId = machineId; // Attach machineId to the request object for future use
//   } else {
//     req.machineId = req.cookies.machineId; // Retrieve machineId from the cookie
  
//   next();
// });
// app.get('/user' , (req ,res)=>{
// const username = os.userInfo().username;
// const userid = os.getuid()
// console.log(userid);
// console.log(username);
// })
// const ActiveDirectory = require('activedirectory2');

// const ad = new ActiveDirectory();

// ad.find('sAMAccountName=SMIT', function(err, user) {
//   if (err) {
//     console.log('Error:', err);
//     return;
//   }

//   if (!user) {
//     console.log('User not found.');
//     return;
//   }

//   console.log('User:', user);
// });

// app.get('/local-user-id', (req, res) => {
//   try {
//       let userId;
//       // Platform-specific command to get the current user's ID
//       if (process.platform === 'win32') {
//           // For Windows
//           userId = execSync('wmic useraccount where name="%username%" get sid').toString().trim();
//       } else {
//           // For macOS and Linux
//           userId = execSync('id -u').toString().trim();
//       }
//       res.json({ userId });
//   } catch (error) {
//       console.error('Error retrieving local user ID:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });
// // Route to get machine ID
// app.get('/machineId', (req, res) => {
//   if (req.cookies.userId) {
//     // If machineId cookie exists, send it in the response
//     res.json({ machineId: req.cookies.userId });
//   } else {
//     // If machineId cookie doesn't exist, send a message indicating its absence
//     res.status(404).json({ error: "user ID not found" });
//   }
// });

// Other routes and middleware...



app.use(cors());
app.use(express.json());

app.use( "/", matrixRoutes);
app.use("/" , departmentRoutes)
app.use("/", teamsRoutes);

app.use("/", employeeRoutes);

app.post("/sendMembers", (req, res) => {
  const { selectedOptions, teamid, team_Name } = req.body;
  console.log(selectedOptions);
  console.log(teamid, team_Name);
  const data = selectedOptions;

  // Flatten the array of arrays
  const flattenedArray = data.flat();

  // Filter out duplicate objects based on their value property
  const uniqueArray = flattenedArray.filter((obj, index, self) =>
    index === self.findIndex((o) => o.value === obj.value)
  );

  console.log(uniqueArray);
  const insertQuery = "INSERT INTO Mapping (Team_id, Employee_id) VALUES ";
  const values = uniqueArray.map(({ value }) => `(${teamid}, '${value}')`).join(", ");

  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    // Construct and execute the parameterized insert query
    const query = insertQuery + values;
    request.query(query, function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Data inserted into the database:", uniqueArray);
      res.status(200).json({ message: "Data inserted successfully." });
    });
  });
});



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
    const id = record.ID;
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
    });
  });
});

app.post("/submitFormData", async (req, res) => {
  const { name, id , fromDate, toDate, leaveType } = req.body;

  const formData = [
    {
      Name: name,
      ID: id,
      FromDate: fromDate,
      ToDate: toDate,
      LeaveID: leaveType,
    },
  ];
  console.log(formData);
  sql.connect(config, function (err, recordset) {
    if (err) {
      console.log(err);
    }

    let request = new sql.Request();
    const insertQuery = `INSERT INTO tblExtLeaves (ID , Name, FromDate, ToDate, LeaveID) VALUES ('${id}', '${name}', '${fromDate}', '${toDate}', '${leaveType}')`;

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
