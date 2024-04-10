const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const app = express();
const authService = require("../service/social_auth_service");
const CONSTANT = require("../utils/constant");
const Config = require("../utils/config");
const CustomReponse = require("../utils/customResponse");

// Handling the multiple environment
const dotenv = require("dotenv");
dotenv.config({});

app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, //your-client-id
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, //your-client-secret
      callbackURL: "/api/v1/auth/callback/google",
    },
    function (accessToken, refreshToken, profile, done) {
      // Here you can handle user authentication logic
      // For instance, check if the user already exists in your database and create one if not
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Route to authenticate with Google
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/userDetail", (req, res) => {
  let email = req.query.email;
  authService
    .login(email)
    .then((result) => {
      // res.redirect("/api/v1/users/viewMyProfile");
      res
        .status(CONSTANT.HTTP_STATUS_CODE.SUCCESS)
        .send(
          CustomReponse.sendResponse(
            CONSTANT.HTTP_STATUS_CODE.SUCCESS,
            CONSTANT.MESSAGE.SUCCESS,
            CONSTANT.MESSAGE.LOGIN,
            result
          )
        );
    })
    .catch((error) => {
      res
        .status(CONSTANT.HTTP_STATUS_CODE.ERROR)
        .send(
          CustomReponse.sendResponse(
            CONSTANT.HTTP_STATUS_CODE.ERROR,
            CONSTANT.MESSAGE.FAILED,
            CONSTANT.MESSAGE.FAILED,
            error
          )
        );
    });
});

app.get(
  "/callback/google",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect(`/api/v1/auth/userDetail?email=${req.user._json.email}`);
  }
);

module.exports = app;
