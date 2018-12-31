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
            activity: parseFloat(req.body.activity),
            userId: req.params.id,
            calories: Math.round(((10 * (req.body.weight / 2.2) + (6.25 * (req.body.height * 2.54)) - (5 * req.body.age))))
        };
        nutritionQueries.addNutrition(newNutrition, (err, nutrition) => {
            if(err){
                console.log(err);
                res.redirect(500, `/users`);
            } else {
                console.log(newNutrition);
                res.redirect(303, `/users/${req.params.id}`);
            }
        });
    },
    show(req, res, next){
        nutritionQueries.getNutrition(req.body.id, (err, nutrition) => {
            console.log(req.body.id);
            console.log(nutrition);
            if(err || nutrition == null){
                res.redirect(404, "/");
            } else {
                console.log(nutrition);
                res.render('nutrition/show', {nutrition});
            }
        });
    }
}