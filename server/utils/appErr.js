class AppErr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = "Failed";
  }
}
// next(new AppErr("User already exists"))

const appErr = (message, statusCode) => {
  let error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = { AppErr, appErr };
