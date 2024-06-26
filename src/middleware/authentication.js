const userDAO = require("../dao/user_dao");
const constant = require("../utils/constant");
const jwt = require("jsonwebtoken");

let authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(405).send("required Token");
    }
    console.log("starting of middleware");
    let token = req.headers.authorization; // step 1
    console.log("starting of middleware", token);
    let decodedPayload = jwt.verify(token, constant.JWT.JWT_SECRET); // user payload collection // step 2
    console.log("starting of middleware", decodedPayload);
    userDAO.getByCondition({ email: decodedPayload.email }).then((result) => {
      if (!result) {
        return res.send("user is not authorized");
      } else {
        req.user = decodedPayload;
        console.log("inside middleware");
        next();
      }
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = authentication;
