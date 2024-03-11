const express = require("express");
const router = express.Router();
const department = require("../controllers/department");

//for  dropdown selection and showing in team page
router.get("/depts", department.getDepts);

router.post("/deptsData", department.getDeptsData);

// router.post("/DropDownData", main.getData);

// router.post("/", employeeController.getAllEmployees);

module.exports = router;