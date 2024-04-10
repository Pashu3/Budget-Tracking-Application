const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  //callback function holds the user --- decoded is the user signed in
  return jwt.verify(token, "anykey", (error, decoded) => {
    if (error) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = verifyToken;
