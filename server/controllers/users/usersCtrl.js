const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");

//REGISTER
const userRegisterCtrl = async (req, res, next) => {
  const { fullname, password, email } = req.body;
  try {
    //>>1 check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Already Exists", 400));
      //next(new AppErr("User already exists")) -- for class we use new keyword
    }

    //>>2 Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//LOGIN
const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //>1 Check if email exists
    const userFound = await User.findOne({ email });
    if (!userFound) return next(appErr("Invalid Login credentials", 400));

    //>2 check for password validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) return next(appErr("Invalid Login credentials", 400));

    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//PROFILE
const userProfileCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json(user);
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//DELETE
const userDeleteCtrl = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//UPDATE
const userUpdateCtrl = async (req, res, next) => {
  try {
    //1. Check if email exists
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) return next(appErr("Email already exists", 400));
    }

    //2. Check if user updating the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        { new: true, runValidators: true }
      );
      //Send the response
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    //Send the response
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
};
