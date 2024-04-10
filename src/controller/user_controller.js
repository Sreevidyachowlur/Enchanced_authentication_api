const express = require("express");
const route = express.Router();
const userService = require("../service/user_service");
const CONSTANT = require("../utils/constant");
const authentication = require("../middleware/authentication");
const upload = require("../utils/fileupload");
const Config = require("../utils/config");
const CustomReponse = require("../utils/customResponse");

route.post(Config.registerURL, (req, res) => {
  console.log("from controller", req.body);
  userService
    .register(req.body)
    .then((result) => {
      res
        .status(CONSTANT.HTTP_STATUS_CODE.CREATED)
        .send(
          CustomReponse.sendResponse(
            CONSTANT.HTTP_STATUS_CODE.CREATED,
            CONSTANT.MESSAGE.SUCCESS,
            CONSTANT.MESSAGE.REGISTERED_SUCCESS,
            { _id: result._id, name: result.name, role: result.role }
          )
        );
    })
    .catch((error) => {
      res.status(CONSTANT.HTTP_STATUS_CODE.ERROR).send(error);
    });
});
route.post(Config.loginURL, (req, res) => {
  console.log("from controller", req.body);

  userService
    .login(req.body)
    .then((result) => {
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
route.get(Config.logOut, (req, res) => {
  userService
    .logout(req.headers)
    .then((result) => {
      res
        .status(CONSTANT.HTTP_STATUS_CODE.SUCCESS)
        .send(
          CustomReponse.sendResponse(
            CONSTANT.HTTP_STATUS_CODE.SUCCESS,
            CONSTANT.MESSAGE.SUCCESS,
            CONSTANT.MESSAGE.LOGOUT,
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
route.get(Config.viewProfile, authentication, (req, res) => {
  userService
    .viewProfie(req.params.id, req.user.role)
    .then((result) => {
      res
        .status(CONSTANT.HTTP_STATUS_CODE.SUCCESS)
        .send(
          CustomReponse.sendResponse(
            CONSTANT.HTTP_STATUS_CODE.SUCCESS,
            CONSTANT.MESSAGE.SUCCESS,
            CONSTANT.MESSAGE.REGISTERED_SUCCESS,
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
route.get(Config.viewMyProfile, authentication, (req, res) => {
  userService
    .viewMyProfile(req.user.email)
    .then((result) => {
      res
        .status(CONSTANT.HTTP_STATUS_CODE.SUCCESS)
        .send(
          CustomReponse.sendResponse(
            CONSTANT.HTTP_STATUS_CODE.SUCCESS,
            CONSTANT.MESSAGE.SUCCESS,
            CONSTANT.MESSAGE.REGISTERED_SUCCESS,
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
route.patch(Config.switchProfileType, authentication, (req, res) => {
  userService
    .switchProfileType(req.user.email, req.params.status)
    .then((result) => {
      res
        .status(CONSTANT.HTTP_STATUS_CODE.SUCCESS)
        .send(
          CustomReponse.sendResponse(
            CONSTANT.HTTP_STATUS_CODE.SUCCESS,
            CONSTANT.MESSAGE.SUCCESS,
            CONSTANT.MESSAGE.SUCCESS,
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
route.post(Config.uploadImage, upload.single("image"), (req, res) => {
  // 'image' is the name of the file input field in the form

  // Check if file was uploaded successfully
  if (req.file) {
    // File was uploaded successfully
    console.log("check file", req.file);
    res
      .status(200)
      .json({ success: true, message: "File uploaded successfully" });
  } else {
    // File upload failed (e.g., file size exceeds limit)
    console.log("inside else part");
    res.status(400).json({ success: "failed", error: "File upload failed" });
  }
});

module.exports = route;
