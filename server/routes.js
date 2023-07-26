const express = require("express");
const router = express.Router();

//Require controller module
const controller = require('./controllers');

//GET all activities for a specific destination
router.get("/nonstop", controller.nonstop);

//GET trip
router.get("/price", controller.price);


module.exports = router;