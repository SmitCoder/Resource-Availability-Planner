const express = require("express");
const router = express.Router();
const employee = require("../controllers/employee");

// Get all employees
router.get("/employee", employee.getTableData);

router.post("/pushemployee", employee.updateTableData);

// router.post("/", employeeController.getAllEmployees);

module.exports = router;
