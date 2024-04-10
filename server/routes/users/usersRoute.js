const express = require("express");

const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
} = require("../../controllers/users/usersCtrl");
const isLogin = require("../../middlewares/isLogin");

const usersRoute = express.Router();

//POST/api/v1/users/REGISTER
usersRoute.post("/register", userRegisterCtrl);

//POST/api/v1/users/LOGIN
usersRoute.post("/login", userLoginCtrl);

//GET/api/v1/users/PROFILE/
usersRoute.get("/profile/", isLogin, userProfileCtrl);

//DELETE/api/v1/users/
usersRoute.delete("/", isLogin, userDeleteCtrl);

//PUT/api/v1/users/:ID
usersRoute.put("/", isLogin, userUpdateCtrl);

module.exports = usersRoute;
