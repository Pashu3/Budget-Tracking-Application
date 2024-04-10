const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "anykey", { expiresIn: "100d" });
};

module.exports = generateToken;
