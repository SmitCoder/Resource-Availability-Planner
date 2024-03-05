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

const getDepts = (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    request.query(
      "select distinct(deptcode) from tblTeam",
      function (err, recordset) {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }

        // send records as a response
        res.json(recordset);
        console.log(recordset);
        // console.log("data is sended");
        // res.end();
        // console.log("connectio ended");
        //   console.log(recordset);
      }
    );
  });
};

const getDeptsData = (req, res) => {
  const { deptcode } = req.body;
  console.log(deptcode);
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    request.query(
      `SELECT Name FROM tblTeam WHERE deptcode = '${deptcode}'`,
      function (err, recordset) {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }

        // send records as a response
        res.json(recordset);
        console.log(recordset);
        // console.log("data is sended");
        // res.end();
        // console.log("connectio ended");
        //   console.log(recordset);
      }
    );
  });
};

// const getSelectedOptions = (req, res) => {
//   const { deptcode, team } = req.body;
//   console.log(deptcode, team);
//   sql.connect(config, function (err) {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Internal Server Error");
//     }
//     const request = new sql.Request();
//     const query = `SELECT * FROM tblTeam WHERE deptcode = @deptcode AND Team = @team`; // Using parameterized query

//     request.input("deptcode", sql.NVarChar, deptcode);
//     request.input("team", sql.NVarChar, team);
//     request.query(query, function (err, recordset) {
//       if (err) {
//         console.log(err);
//         return res.status(500).send("Internal Server Error");
//       }

//       // send records as a response
//       res.json(recordset);
//       console.log(recordset);
//       // console.log("data is sended");
//       // res.end();
//       // console.log("connectio ended");
//       //   console.log(recordset);
//     });
//   });
// };
module.exports = { getDepts, getDeptsData };
