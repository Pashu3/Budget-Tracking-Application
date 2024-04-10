const globalErrHandler = (err, req, res, next) => {
  //statusCode
  const statusCode = (err.statusCode = err.statusCode || 500);
  //status
  const status = (err.status = err.status || "error");
  //message
  const message = err.message;
  //stack
  const stack = err.stack;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

module.exports = globalErrHandler;
