const express = require("express");
const {
  accountsCreateCtrl,
  accountsSingleCtrl,
  accountsDeleteCtrl,
  accountsUpdateCtrl,
  accountsGetAllCtrl,
} = require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");

const accountsRoute = express.Router();

//POST/api/v1/accounts
accountsRoute.post("/", isLogin, accountsCreateCtrl);

//GET/api/v1/accounts/:ID
accountsRoute.get("/:id", accountsSingleCtrl);

//GET/api/v1/accounts/
accountsRoute.get("/", accountsGetAllCtrl);

//DELETE/api/v1/accounts/:ID
accountsRoute.delete("/:id", accountsDeleteCtrl);

//PUT/api/v1/accounts/:ID
accountsRoute.put("/:id", accountsUpdateCtrl);

module.exports = accountsRoute;
