const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appArror");

const generateAndSendToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("jwt", token, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

const signUp = async (req, res, next) => {
  try {
    const { fullname, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      fullname,
      email,
      password,
      passwordConfirm,
    });

    generateAndSendToken(res, newUser._id);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password.", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Incorrect  email or password.", 401));
    }

    generateAndSendToken(res, user._id);

    res.status(200).json({
      status: "success",
      message: "login successful",
    });
  } catch (err) {
    next(err);
  }
};

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return next(new AppError("Please log in to get access.", 401));
    }

    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id);
    if (!user) {
      return next(new AppError("User doesn't exist."), 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not allowed", 403));
    }
    next();
  };

const logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({
    status: "success",
    message: "logged out successfully",
  });
};

module.exports = { signUp, logIn, logOut, protect, restrictTo };