const Nutrition = require("./models").Nutrition;
const User = require("./models").User;

module.exports = {
    addNutrition(newNutrition, callback){
        return Nutrition.create({
            age: newNutrition.age,
            gender: newNutrition.gender,
            weight: newNutrition.weight,
            height: newNutrition.height,
            activity: newNutrition.activity,
            userId: newNutrition.userId
        })
        .then((nutrition) => {
            callback(null, nutrition);
        })
        .catch((err) => {
            callback(err);
        })
    }
}