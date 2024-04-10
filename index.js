// Reference the Express npm package inorder to create server setup
const express = require("express");
const app = express();

// Include bodyparser to integrate it in expressjs inorder to accept body data in post API.
const bodyparser = require("body-parser");
app.use(bodyparser.json());

const swaggerUi = require("swagger-ui-express");
const openJSON = require("./open_api.json");

// Handling the multiple environment
const dotenv = require("dotenv");
dotenv.config({});

// MongoDB connectivity to express server via Mongoose
require("./database");
const config = require("./src/utils/config");
app.use((req, res, next) => {
  console.log("request obj", req.originalUrl);
  next();
});

// to run swagger
app.use("/restapi", swaggerUi.serve, swaggerUi.setup(openJSON));

// Create the Routes for the API.
app.use(`${config.baseUrl}/users`, require("./src/controller/user_controller"));
app.use(
  `${config.baseUrl}/auth`,
  require("./src/controller/social_auth_controller")
);

// Starting server using port configured in .env file
app.listen(process.env.PORT, () => {
  console.log("listening the port ", process.env.PORT);
});
