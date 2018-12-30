const express = require("express");
const router = express.Router();

const nutritionController = require("../controllers/nutritionController");

router.get("/users/:id/new_nutrition", nutritionController.new);

module.exports = router;