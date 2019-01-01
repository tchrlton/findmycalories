const Nutrition = require("./models").Nutrition;
const User = require("./models").User;

module.exports = {
    addNutrition(newNutrition, callback){
        return Nutrition.upsert(newNutrition, {returning: true})
        .then((nutrition) => {
            callback(null, nutrition);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getNutrition(userId, callback){
        return Nutrition.findOne({
            where: {userId: userId}
        })
        .then((nutrition) => {
          console.log("--DEBUG getNutrition Query--");
          console.log(`Looking for ID {${userId}}`);
          console.dir(nutrition);
          console.log(`\n\n`);
          callback(null, nutrition);
        })
        .catch((err) => {
            console.log(err);
          callback(err);
        })
    },
}