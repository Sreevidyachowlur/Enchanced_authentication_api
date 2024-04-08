const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/enhanced_authentication-db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = mongoose;
