var express = require("express");
var route = express.Router();
const authService = require("../service/auth_service");

route.post("/login", (req, res) => {
  console.log(req.body);
  authService
    .login(req.body)
    .then((result) => {
      //NOTE: in controller we will use only then() and catch()
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = route;
