const userModel = require("../Model/user_model");

let userDao = {
  userRegister: (payload) => {
    console.log("from dao", payload);
    return new userModel({
      //NOTE:its connected with DB so,DAO indirectly wrapped with promise
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      profilePic: payload.profilePic,
      password: payload.password,
      bio: payload.bio,
      role: payload.role,
      profileType: payload.profileType,
    }).save();
  },

  login: (payload) => {
    let { email, password } = payload;
    return userModel.find({ email: email, password: password });
  },
  getByCondition: (condition) => {
    return userModel.findOne(condition);
  },
  isExist: (payload) => {
    let { email } = payload;
    return userModel.find({ email: email });
  },
  viewProfie: (payload) => {
    let { id } = payload;
    return userModel.find({ _id: id });
  },
};
module.exports = userDao;
