const Nutrition = require("./models").Nutrition;
const User = require("./models").User;

module.exports = {
    addNutrition(newNutrition, callback){
        return Nutrition.create(newNutrition)
        .then((nutrition) => {
            callback(null, nutrition);
        })
        .catch((err) => {
            callback(err);
        })
    }
}