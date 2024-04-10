const UserDao = require("../dao/user_dao");
const CONSTANT = require("../utils/constant");
const jwt = require("jsonwebtoken");

let userService = {
  register: (payload) => {
    console.log("from service", payload);
    return new Promise((resolve, reject) => {
      UserDao.isExist(payload)
        .then((res) => {
          if (res.length > 0) {
            console.log("res", res);
            reject("Email already exists. Please try to login");
          } else {
            UserDao.register(payload)
              .then((result) => {
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
    return new Promise(async (resolve, reject) => {
      let userData = await UserDao.isExist(payload);
      if (userData.length == 0)
        reject("User not register with this email. Please register");
      else {
        if (userData[0].password == payload.password) {
          const token = jwt.sign(
            {
              name: userData[0].name,
              role: userData[0].role,
              email: userData[0].email,
            },
            CONSTANT.JWT.JWT_SECRET
          );
          resolve({ token });
        } else {
          reject("Password is incorrect. Please check once again..");
        }
      }
    });
  },
  viewProfie: (profileId, role) => {
    console.log("from service", profileId);
    let payload = {};
    return new Promise((resolve, reject) => {
      if (role == "ADMIN") payload._id = profileId;
      else {
        payload._id = profileId;
        payload.profileType = "PUBLIC";
      }
      UserDao.viewProfile(payload)
        .then((result) => {
          if (!result) {
            reject("User profile is private");
          } else {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  viewMyProfile: (email) => {
    console.log("from service", email);
    return new Promise((resolve, reject) => {
      UserDao.viewMyProfile(email)
        .then((result) => {
          if (!result) {
            reject("User profile is private");
          } else {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout: (token) => {
    console.log("from service", token);
    token = null;
    return token;
  },
  switchProfileType: (email, status) => {
    console.log("from service", email, status);
    return new Promise((resolve, reject) => {
      let payload = {
        email: email,
        type:
          status == "active"
            ? "PUBLIC"
            : status == "inactive"
            ? "PRIVATE"
            : "PUBLIC",
      };
      let newProfileType =
        status == "inactive"
          ? "PUBLIC"
          : status == "active"
          ? "PRIVATE"
          : "PUBLIC";
      UserDao.switchProfileType(payload)
        .then((result) => {
          resolve({
            message: `changed your profile as ${newProfileType} account`,
            result,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
module.exports = userService;
