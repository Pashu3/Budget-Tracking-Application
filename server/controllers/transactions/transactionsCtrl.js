const Account = require("../../models/Account");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const { appErr } = require("../../utils/appErr");

//CREATE
const transactionCreateCtrl = async (req, res, next) => {
  const { name, amount, notes, transactionType, account, category } = req.body;
  try {
    //1. Find user
    const userFound = await User.findById(req.user);
    if (!userFound) return next(appErr("User not found", 404));
    //2. Find the account
    const accountFound = await Account.findById(account);
    if (!accountFound) return next(appErr("Account not found", 404));
    //3. Create the transaction
    const transaction = await Transaction.create({
      amount,
      notes,
      account,
      transactionType,
      category,
      name,
      createdBy: req.user,
    });
    //4. Push the transaction to the account
    accountFound.transactions.push(transaction._id);
    //5. Resave the account
    await accountFound.save();
    res.json({ status: "success", data: transaction });
  } catch (error) {
    res.json({ msg: error });
  }
};

//GET
const transactionGetCtrl = async (req, res, next) => {
  try {
    const trans = await Transaction.find();
    res.status(200).json({ status: "success", data: trans });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//GET SINGLE
const transactionSingleCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trans = await Transaction.findById(id);
    res.json({ status: "success", data: trans });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//DELETE
const transactionDeleteCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ status: "success", data: null });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//UPDATE
const transactionUpdateCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trans = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ status: "success", data: trans });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};
module.exports = {
  transactionCreateCtrl,
  transactionGetCtrl,
  transactionSingleCtrl,
  transactionDeleteCtrl,
  transactionUpdateCtrl,
};
