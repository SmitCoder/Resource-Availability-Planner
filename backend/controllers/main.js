const sql = require("mssql");
const config = {
  user: "SA",
  password: "091002",
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
let pool;

const getTableData = (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const request = new sql.Request();

    request.query(
      "SELECT deptcode, Team  ,  COUNT(*) AS record_count FROM tblTeam WHERE Team <> '' AND deptcode <> ''  GROUP BY deptcode , Team",
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
  const { name, description, teamId } = req.body;

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
  const { name, description } = req.body;

  sql.connect(config, function (err, recordset) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database connection error" });
    }

    let request = new sql.Request();
    const insertQuery = `INSERT INTO tblTeams (name, description) VALUES ('${name}', '${description}')`;

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
  const { teamId, name, description } = req.body;

  sql.connect(config, function (err, recordset) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database connection error" });
    }

    let request = new sql.Request();
    const updateQuery = `UPDATE tblTeams SET name='${name}', description='${description}' WHERE Teamid='${teamId}'`;

    request.query(updateQuery, function (err, recordset) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query error" });
      }

      res.json({ message: "Entry updated successfully" });
    });
  });

  // sql.close();
  console.log("connection ended");
}
// async function updateEntry(req, res) {
//   const { teamId, name, description } = req.body;

//   try {
//     // Create a connection pool to manage connections efficiently
//     pool = await new sql.ConnectionPool(config); // Ensure `config` contains your database connection details

//     // Start a transaction for atomicity and error handling
//     const transaction = await pool.beginTransaction();

//     try {
//       // Execute the update query within the transaction
//       await transaction
//         .request()
//         .query(
//           `UPDATE Teams SET name = @name, description = @description WHERE id = @teamId`,
//           {
//             name,
//             description,
//             teamId,
//           }
//         );

//       // Commit the transaction if successful
//       await transaction.commit();
//       res.json({ message: "Entry updated successfully" });
//     } catch (err) {
//       // Rollback the transaction if an error occurs
//       await transaction.rollback();
//       console.error("Error updating entry:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//   } catch (err) {
//     console.error("Error connecting to database:", err);
//     return res.status(500).json({ error: "Database connection error" });
//   } finally {
//     // Ensure the pool is closed even if errors occur
//     if (pool) {
//       await pool.close();
//       console.log("Connection pool closed");
//     }
//   }
// }

// async function updateEntry(req, res) {
//   const { teamId, name, description } = req.body;

//   try {
//     // Create a connection pool outside the function if it hasn't been created yet
//     if (!pool) {
//       pool = await new sql.ConnectionPool(config); // Ensure `config` contains your database connection details
//       console.log("Connection pool created");
//     }

//     // Acquire a connection from the pool
//     const connection = await pool.request().connection;

//     try {
//       // Begin a transaction using the connection
//       const transaction = await connection.beginTransaction();

//       try {
//         // Execute the update query within the transaction
//         await transaction
//           .request()
//           .query(
//             `UPDATE Teams SET name = @name, description = @description WHERE id = @teamId`,
//             {
//               name,
//               description,
//               teamId,
//             }
//           );

//         // Commit the transaction if successful
//         await transaction.commit();
//         res.json({ message: "Entry updated successfully" });
//       } catch (err) {
//         // Rollback the transaction if an error occurs
//         await transaction.rollback();
//         console.error("Error updating entry:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//     } finally {
//       // Release the connection back to the pool
//       await connection.release();
//     }
//   } catch (err) {
//     console.error("Error connecting to database:", err);
//     return res.status(500).json({ error: "Database connection error" });
//   } finally {
//     // Ensure the pool is closed even if errors occur
//     if (pool) {
//       await pool.close();
//       console.log("Connection pool closed");
//     }
//   }
// }

// async function updateEntry(req, res) {
//   const { teamId, name, description } = req.body;

//   try {
//     // Create a connection pool outside the function if it hasn't been created yet
//     if (!pool) {
//       pool = await new sql.ConnectionPool(config); // Ensure `config` contains your database connection details
//       console.log("Connection pool created");
//     }

//     // Acquire a connection from the pool
//     const connection = await pool.request().connection;

//     if (!connection) {
//       // Handle the case where acquiring a connection fails
//       console.error("Failed to acquire a connection from the pool");
//       return res.status(500).json({ error: "Database connection error" });
//     }

//     try {
//       // Begin a transaction using the connection
//       const transaction = await connection.beginTransaction();

//       // ... rest of the code within the transaction remains the same ...
//     } finally {
//       // Release the connection back to the pool (if acquired successfully)
//       if (connection) {
//         await connection.release();
//       }
//     }
//   } catch (err) {
//     console.error("Error connecting to database:", err);
//     return res.status(500).json({ error: "Database connection error" });
//   } finally {
//     // Ensure the pool is closed even if errors occur
//     if (pool) {
//       await pool.close();
//       console.log("Connection pool closed");
//     }
//   }
// }
module.exports = {
  getTableData,
  pushTableData,
  updateTableData,
};
