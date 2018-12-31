const express = require("express");
const router = express.Router();

const nutritionController = require("../controllers/nutritionController");

router.post("/users/:id/nutrition/create", nutritionController.create);

module.exports = router;