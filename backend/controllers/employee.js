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

const getTableData = (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    request.query("select * from tblExtEmp", function (err, recordset) {
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

const pushTableData = (req, res) => {
  const { id, name } = req.body;

  console.log(name);
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();
    const insertQuery = `INSERT INTO Ext_Emp (Emp_id, Emp_Name) VALUES ('${id}', '${name}')`;

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
  const { name, teamId } = req.body;

  console.log(name);
  console.log(teamId);

  if (!teamId) {
    // If teamId is null, it's a new entry
    createNewEntry(req, res);
  } else {
    // If teamId is provided, it's an update operation
    updateEntry(req, res);
  }
};
function createNewEntry(req, res) {
  const { id, name } = req.body;

  sql.connect(config, function (err, recordset) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database connection error" });
    }

    let request = new sql.Request();
    const insertQuery = `INSERT INTO tblExtEmp (ExtEmployee_id, ExtEmployee_Name) VALUES ('${id}', '${name}')`;

    request.query(insertQuery, function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query error" });
      }

      res.json({ message: "New entry created successfully" });
    });
  });
}

function updateEntry(req, res) {
  const { id, name, teamId } = req.body;

  sql.connect(config, function (err, recordset) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database connection error" });
    }

    let request = new sql.Request();
    const updateQuery = `UPDATE tblExtEmp SET ExtEmployee_id='${id}', ExtEmployee_name='${name}' WHERE ExtEmployee_id='${teamId}'`;

    request.query(updateQuery, function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query error" });
      }

      res.json({ message: "Entry updated successfully" });
    });
  });
  console.log("connection ended");
}
module.exports = { getTableData, pushTableData, updateTableData };
