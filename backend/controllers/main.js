const sql = require("mssql");
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
let pool;
const groupData = (data) => {
  const grouped = {};
  data.recordset.forEach((record) => {
    const name = record.Name;
    // const id = record.ID;
    const id = record.Employee_id
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

const getTableData = (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();
const query  = "select * from tblTeam";
    // const query  = " "SELECT deptcode, Team , COUNT(*) AS record_count FROM tblEmployees WHERE Team <> '' AND deptcode <> ''  GROUP BY deptcode , Team","
    request.query(query ,
     
      function (err, recordset) {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }

        // send records as a response
        res.json(recordset);
        // console.log("data is sended");
        // res.end();
        // console.log("connectio ended");
        //   console.log(recordset);
      }
    );
  });
};
const pushTableData = (req, res) => {
  const { name, description } = req.body;

  console.log(name);
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();
    const insertQuery = `INSERT INTO Teams (Name, Description) VALUES ('${name}', '${description}')`;

    request.query(insertQuery, function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      // send records as a response
      res.json(recordset);
      // console.log("data is sended");
      // res.end();
      // console.log("connectio ended");
      //   console.log(recordset);
    });
  });
};

const updateTableData = (req, res) => {
  const { name, description } = req.body;

  console.log(name , description);
  

  sql.connect(config, function (err, recordset) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database connection error" });
    }

    let request = new sql.Request();
    const insertQuery = `INSERT INTO tblTeam (Name, Description) VALUES ('${name}', '${description}')`;

    request.query(insertQuery, function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query error" });
      }

      res.json({ message: "New entry created successfully" });
    });
  });
};
// function createNewEntry(req, res) {
//   const { name, description } = req.body;

  
// }

// function updateEntry(req, res) {
//   const { teamId, name, description } = req.body;

//   sql.connect(config, function (err, recordset) {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Database connection error" });
//     }

//     let request = new sql.Request();
//     const updateQuery = `UPDATE tblTeams SET name='${name}', description='${description}' WHERE Teamid='${teamId}'`;

//     request.query(updateQuery, function (err, recordset) {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Database query error" });
//       }

//       res.json({ message: "Entry updated successfully" });
//     });
//   });

//   // sql.close();
//   console.log("connection ended");
// }

// const getData = (req, res) => {
//   const { deptcode, team } = req.body;

//   console.log(deptcode, team);
//   sql.connect(config, function (err) {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Internal Server Error");
//     }

//     const request = new sql.Request();

//     request.query(
//       ` select  (COSEC.Name) , tblTeam.deptcode , COSEC.FromDate,
//      COSEC.ToDate , COSEC.LeaveID , COSEC.APPLDays , COSEC.ModifyFromHalf,
//      COSEC.ModifyToHalf
//      from tblTeam
//      left join
//      COSEC on tblTeam.ID = COSEC.ID
//      where deptcode = ${deptcode} and Team = ${team}`,
//       function (err, recordset) {
//         if (err) {
//           console.log(err);
//           return res.status(500).send("Internal Server Error");
//         }

//         const groupedData = groupData(recordset);
//         // send records as a response
//         res.json(groupedData);
//         // console.log(groupedData);

//         // console.log("data is sended");
//         // res.end();
//         // console.log("connectio ended");
//         //   console.log(recordset);
//       }
//     );
//   });
// };

const getData = (req, res) => {
  // const { deptcode, team } = req.body;
  const {selectedValue} = req.body;
  console.log(selectedValue);

  // console.log(deptcode, team);
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    // request.input("deptcode", sql.VarChar, deptcode);
    request.input("selectedValue", sql.Int, selectedValue);

    request.query(
      // `SELECT tblTeam.Name ,tblTeam.deptcode, COSEC.FromDate,
      //  COSEC.ToDate, COSEC.LeaveID, COSEC.APPLDays, COSEC.ModifyFromHalf,
      //  COSEC.ModifyToHalf
      //  FROM tblTeam 
      //  LEFT JOIN COSEC ON tblTeam.ID = COSEC.ID 
      //  WHERE deptcode = @deptcode AND Team = @team`,
      //  `SELECT tblEmployees.Name ,tblEmployees.deptcode, COSEC.FromDate,
      //  COSEC.ToDate, COSEC.LeaveID, COSEC.APPLDays, COSEC.ModifyFromHalf,
      //  COSEC.ModifyToHalf
      //  FROM tblEmployees 
      //  LEFT JOIN COSEC ON tblEmployees.ID = COSEC.ID 
      //  WHERE Team`,
      // ` select *  from COSEC right join Mapping on COSEC.ID = Mapping.Employee_id 
      // where Mapping.Team_id =2 `,
      `SELECT  
      Employee_id,
      COSEC.ID,
      tblEmployees.Name,
      COALESCE(COSEC.FromDate, tblExtLeaves.FromDate) AS FromDate,
    COALESCE(COSEC.ToDate , tblExtLeaves.ToDate) AS ToDate,
  
      COALESCE(COSEC.LeaveID,tblExtLeaves.LeaveID) AS LeaveID,
      COSEC.APPLDays,
      COSEC.ModifyFromHalf,
      COSEC.ModifyToHalf
  FROM 
      Mapping
  INNER JOIN tblEmployees ON Mapping.Employee_id = tblEmployees.ID
  LEFT JOIN COSEC ON Mapping.Employee_id = COSEC.ID
  LEFT JOIN tblExtLeaves ON Mapping.Employee_id = tblExtLeaves.ID
  WHERE 
      Mapping.Team_id = @selectedValue`,
      function (err, recordset) {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        console.log(recordset);
        const groupedData = groupData(recordset);
        res.json(groupedData);
      }
    );
  });
};

module.exports = {
  getTableData,
  pushTableData,
  updateTableData,
  getData,
};
