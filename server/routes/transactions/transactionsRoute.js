const express = require("express");

const {
  transactionCreateCtrl,
  transactionGetCtrl,
  transactionSingleCtrl,
  transactionDeleteCtrl,
  transactionUpdateCtrl,
} = require("../../controllers/transactions/transactionsCtrl");
const isLogin = require("../../middlewares/isLogin");

const transactionsRoute = express.Router();

//POST/api/v1/transactions
transactionsRoute.post("/", isLogin, transactionCreateCtrl);

//GET/api/v1/transactions
transactionsRoute.get("/", transactionGetCtrl);

//GET/api/v1/transactions/:ID
transactionsRoute.get("/:id", transactionSingleCtrl);

//DELETE/api/v1/transactions/:ID
transactionsRoute.delete("/:id", transactionDeleteCtrl);

//PUT/api/v1/transactions/:ID
transactionsRoute.put("/:id", transactionUpdateCtrl);

module.exports = transactionsRoute;
