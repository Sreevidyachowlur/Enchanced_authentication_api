const express = require("express");
var route = express.Router();
const userService = require("../Service/user_service");
const constant = require("../utils/constant");
const authentication = require("../middleware/authentication");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
route.use(cookieParser());

route.post("/userRegister", (req, res) => {
  console.log("from controller", req.body);
  userService
    .userRegister(req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
route.post("/login", (req, res) => {
  console.log("from controller", req.body);

  // Assuming you have user data available after authentication
  const userData = { password: req.body.password, email: req.body.email };

  // Generate JWT token
  const token = jwt.sign(userData, constant.JWT.JWT_SECRET);

  // Set token as a cookie
  res.cookie("token", token, { httpOnly: true });

  userService
    .login(req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
route.get("/logOut", (req, res) => {
  // Clear token cookie
  res.clearCookie("token");
  res.send("User signed out successfully");
});

route.get("/viewProfie/:id", authentication, (req, res) => {
  console.log("from controller view", req.params);
  userService
    .viewProfie(req.params)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = route;
