let mongoose = require("../../database");
const Schema = mongoose.Schema;
const constant = require("../utils/constant");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    // required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },

  bio: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: constant.ROLE,
    default: constant.DEFAULT_ROLE,
  },
  profileType: {
    type: String,
    default: "PRIVATE",
  },
});

module.exports = mongoose.model("users", userSchema);
