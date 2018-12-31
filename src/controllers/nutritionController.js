const nutritionQueries = require("../db/queries.nutritions.js");
const Nutrition = require("../../src/db/models").Nutrition;
const User = require("../../src/db/models").User;

module.exports = {
    create(req, res, next){
        let newNutrition = {
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            activity: req.body.activity,
            userId: req.user.id
        };
        nutritionQueries.addNutrition(newNutrition, (err, topic) => {
            if(err){
                res.redirect(500, `/users/${this.user.id}`);
            } else {
                res.redirect(303, `/users/${this.user.id}`);
            }
        });
    }
}