const userDao = require("../Data_Access_Object/user_dao");
const constant = require("../utils/constant");

let userService = {
  userRegister: (payload) => {
    console.log("from service", payload);
    return new Promise((resolve, reject) => {
      userDao
        .isExist(payload)
        .then((res) => {
          if (res.length > 0) {
            console.log("res", res);
            reject("Email already exists. Please try to login");
          } else {
            userDao
              .userRegister(payload)
              .then(async (result) => {
                // Additional operations can be performed here if needed
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  login: (payload) => {
    console.log("from service", payload);
    return new Promise((resolve, reject) => {
      userDao
        .login(payload)
        .then(async (result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  viewProfie: (payload) => {
    console.log("from service", payload);
    return new Promise((resolve, reject) => {
      userDao
        .viewProfie(payload)
        .then(async (result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
module.exports = userService;
