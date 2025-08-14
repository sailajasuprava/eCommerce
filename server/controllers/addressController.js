const Address = require("../models/addressModel");
const AppError = require("../utils/appArror");

// CREATE Address
const createAddress = async (req, res, next) => {
  try {
    const {
      user,
      fullname,
      phone,
      houseNumber,
      street,
      landmark,
      city,
      district,
      state,
      country,
      pincode,
    } = req.body;

    const existing = await Address.findOne({ user: req.user.id });

    if (existing) {
      return next(new AppError("Address of this user already exists", 400));
    }

    const newAddress = await Address.create({
      user,
      fullname,
      phone,
      houseNumber,
      street,
      landmark,
      city,
      district,
      state,
      country,
      pincode,
    });

    res.status(201).json({
      status: "success",
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (err) {
    next(err);
  }
};

// GET All Addresses
const getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find().populate("user", "fullname email");

    if (!addresses) {
      return next(new AppError("No addresses found", 404));
    }

    res.status(200).json({
      status: "success",
      results: addresses.length,
      data: addresses,
    });
  } catch (err) {
    next(err);
  }
};

// GET Single Address
const getAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ user: req.params.userId });
    if (!address) {
      return next(new AppError("No address found for that user ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: address,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE Address
const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!address) {
      return next(new AppError("No address found for that user ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Address updated successfully",
      data: address,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE Address
const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndDelete({ user: req.params.userId });

    if (!address) {
      return next(new AppError("No address found for that user ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Address deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
};
