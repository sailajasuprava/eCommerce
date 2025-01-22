const User = require("../models/userModel");

const addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const { user } = req;

    const existingItem = user.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ productId });
    }

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Product added to cart",
      data: user.cartItems,
    });
  } catch (error) {
    next(error);
  }
};

const getCartItems = async (req, res, next) => {
  try {
    const userData = await User.findById(req.user._id).populate({
      path: "cartItems.productId",
      select: "prodname image price",
    });

    res.status(200).json({
      status: "success",
      results: userData.cartItems.length,
      data: userData.cartItems,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const { user } = req;
    const product = user.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (product.quantity === 1 && quantity === -1) {
      user.cartItems = user.cartItems.filter(
        (item) => item.productId.toString() !== productId
      );
    } else {
      product.quantity += quantity;
    }

    await user.save({ validateBeforeSave: false });

    const userData = await User.findById(req.user._id).populate({
      path: "cartItems.productId",
      select: "prodname image price",
    });

    res.status(200).json({
      status: "success",
      message: "Quantity updated successfully",
      data: userData.cartItems,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const { productId } = req.body;

    // const res = await axios.delete("/cart", { data: { productId } });
    //Otherwise productId will be undefined.

    const { user } = req;

    user.cartItems = user.cartItems.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save({ validateBeforeSave: false });

    const userData = await User.findById(req.user._id).populate({
      path: "cartItems.productId",
      select: "prodname image price",
    });

    res.status(200).json({
      status: "success",
      message: "Item deleted successfully",
      data: userData.cartItems,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart, getCartItems, updateQuantity, deleteCartItem };
