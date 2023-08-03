const authRoute = require("./auth");
const userRoute = require("./user");
const basePath = "/api/v1";

module.exports = (app) => {
  app.use(`${basePath}/auth`, authRoute);
  app.use(`${basePath}/user`, userRoute);
};
