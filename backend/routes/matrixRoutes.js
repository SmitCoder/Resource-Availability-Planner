const express = require("express");
const router = express.Router();
const matrix = require("../controllers/matrix");

//for  dropdown selection and showing in team page
router.get("/matrix", matrix.getTableData);

router.post("/selectedOptions", matrix.getSelectedOptions);

router.post("/delete" , matrix.deleteData);

// router.post("/DropDownData", main.getData);

// router.post("/", employeeController.getAllEmployees);

module.exports = router;
