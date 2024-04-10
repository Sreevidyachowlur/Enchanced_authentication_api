const UserDao = require("../dao/user_dao");
const CONSTANT = require("../utils/constant");
const jwt = require("jsonwebtoken");

let authService = {
  login: (email) => {
    console.log("from service", email);
    return new Promise(async (resolve, reject) => {
      let userData = await UserDao.isExist({ email });
      if (userData.length == 0)
        reject("User not register with this email. Please register");
      else {
        const token = jwt.sign(
          {
            name: userData[0].name,
            role: userData[0].role,
            email: userData[0].email,
          },
          CONSTANT.JWT.JWT_SECRET
        );
        resolve({ token });
      }
    });
  },
};
module.exports = authService;
