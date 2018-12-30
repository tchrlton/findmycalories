module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const nutritionRoutes = require("../routes/nutritions");

      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(nutritionRoutes);
    }
}