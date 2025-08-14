const Cloth = require("../models/clothModel");
const AppError = require("../utils/appArror");

const createCloth = async (req, res, next) => {
  try {
    const {
      prodname,
      description,
      fabric,
      category,
      fit,
      occasion,
      sleeveType,
      neckType,
      pattern,
      variants,
      price,
    } = req.body;

    const newCloth = await Cloth.create({
      prodname,
      description,
      fabric,
      category,
      fit,
      occasion,
      sleeveType,
      neckType,
      pattern,
      variants,
      price,
    });

    res.status(201).json({
      status: "success",
      message: "Clothing item created successfully",
      data: newCloth,
    });
  } catch (err) {
    next(err);
  }
};

const getAllClothes = async (req, res, next) => {
  try {
    const clothes = await Cloth.find().populate({
      path: "reviews",
      select: "comment rating",
    });

    if (!clothes) {
      return next(new AppError("No clothes found", 404));
    }

    res.status(200).json({
      status: "success",
      results: clothes.length,
      data: clothes,
    });
  } catch (err) {
    next(err);
  }
};

const getCloth = async (req, res, next) => {
  try {
    const cloth = await Cloth.findById(req.params.clothId).populate({
      path: "reviews",
      select: "comment rating createdAt user",
    });
    if (!cloth) {
      return next(new AppError("No Clothing item found with that Id", 404));
    }

    res.status(200).json({
      status: "success",
      data: cloth,
    });
  } catch (err) {
    next(err);
  }
};

const updateCloth = async (req, res, next) => {
  try {
    const cloth = await Cloth.findByIdAndUpdate(req.params.clothId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cloth) {
      return next(new AppError("No cloth found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Clothing item updated successfully",
      data: cloth,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCloth = async (req, res, next) => {
  try {
    const cloth = await Cloth.findByIdAndDelete(req.params.clothId);

    if (!cloth) {
      return next(new AppError("No cloth found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Clothing item deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllClothes,
  getCloth,
  createCloth,
  updateCloth,
  deleteCloth,
};
