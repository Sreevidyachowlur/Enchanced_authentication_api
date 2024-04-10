const CONSTANT = {
  ROLE: ["ADMIN", "USER"],
  DEFAULT_ROLE: "USER",
  HTTP_STATUS_CODE: {
    SUCCESS: 200,
    CREATED: 201,
    NOT_FOUND: 400,
    ERROR: 500,
    BAD_REQUEST: 406,
  },
  STATUS: ["APPROVED", "INREVIEW", "REJECTED"],
  // ENDPOINT: {
  //   USER: {
  //     CREATE_USER: "/createUser",
  //     LOGIN: '/auth'
  //   },

  JWT: {
    JWT_SECRET: "test@123",
  },
  MESSAGE: {
    SUCCESS: "Success",
    FAILED: "Failed",
    REGISTERED_SUCCESS: "User registered successfully.",
    LOGIN: "Logedin successfully",
    LOGOUT: "Logged out successfully",
  },

  // }
};
module.exports = CONSTANT;
