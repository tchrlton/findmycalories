const nutritionQueries = require("../db/queries.nutritions.js");
const Nutrition = require("../../src/db/models").Nutrition;
const User = require("../../src/db/models").User;

module.exports = {
    new(req, res, next){
        res.render("nutrition/new");
    }
}