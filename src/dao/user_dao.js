const userModel = require("../model/user_model");

let userDao = {
  register: (payload) => {
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
    return userModel.find(
      { email: email, password: password },
      { password: 0 }
    );
  },
  getByCondition: (condition) => {
    return userModel.findOne(condition);
  },
  isExist: (payload) => {
    console.log("payload-----doa", payload);
    return userModel.find({ email: payload.email });
  },
  viewProfile: (payload) => {
    return userModel.findOne(payload, { password: 0 });
  },
  viewMyProfile: (email) => {
    console.log("inside viewMyProfile", email);
    return userModel.findOne({ email: email }, { password: 0 });
  },
  getProfileType: (id) => {
    console.log("getProfileType", id);
    return userModel.find({ _id: id });
  },
  switchProfileType: (payload) => {
    let { email, type } = payload;
    return userModel.updateOne(
      { email: email },
      { $set: { profileType: type } }
    );
  },
};
module.exports = userDao;
