const express = require("express");
const router = express.Router();
const main = require("../controllers/main");

//for  dropdown selection and showing in team page
router.post("/teams", main.getTableData);

router.post("/teamss", main.updateTableData);

router.post("/DropDownData", main.getData);

router.get("/teamdata" , main.getTeam);

// router.post("/", employeeController.getAllEmployees);

module.exports = router;
