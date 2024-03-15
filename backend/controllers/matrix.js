const sql = require("mssql");
const config = {
  user: "smit",
  password: "hello123",
  server: "localhost\\SQLEXPRESS",
  database: "leaves",
  port: "5000",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

const getTableData = (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    request.query(
      "SELECT deptcode, Team FROM tblEmployees GROUP BY deptcode, Team",
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

const getSelectedOptions = (req, res) => {
  const { deptcode, team } = req.body;
  const {teamid} = req.body;
  console.log(deptcode, team);
  console.log(teamid);
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    const request = new sql.Request();
    // const query = `SELECT * FROM tblEmployees WHERE deptcode = @deptcode AND Team = @team`;
     // Using parameterized query
// const query  = ` select * 
// from Mapping join tblEmployees on Mapping.Employee_id = tblEmployees.ID
// where deptcode = @deptcode and Team = @team`

// const query = `select * from Mapping inner join tblEmployees
// on Mapping.Employee_id = tblEmployees.ID where tblEmployees.ID
// in (select Employee_id from tblTeam inner join Mapping on tblTeam.Team_id  = Mapping.Team_id
// where tblTeam.Team_id  = @teamid);`

const query = `select * from tblEmployees inner join Mapping on tblEmployees.ID = Mapping.Employee_id 
where Mapping.Team_id =@teamid`
    request.input("deptcode", sql.NVarChar, deptcode);
    request.input("team", sql.NVarChar, team);
    request.input("teamid" , sql.Int , teamid)
    request.query(query, function (err, recordset) {
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
    });
  });
};

const deleteData = (req ,res)=>{
const {id} = req.body;
console.log(id);
sql.connect(config , function(err){
  if (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
  const request = new sql.Request();
request.input("id" , sql.NVarChar , id);
    request.query(
     `delete from Mapping where Employee_id = @id`,
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
})
}
module.exports = { getTableData, getSelectedOptions , deleteData };
