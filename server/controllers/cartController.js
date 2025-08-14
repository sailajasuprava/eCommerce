const Cart = require("../models/cartModel");
const AppError = require("../utils/appArror");

// CREATE Cart (or add items to an existing cart)
const createOrUpdateCart = async (req, res, next) => {
  try {
    const { user, cartItems } = req.body;

    // Check if cart already exists
    let cart = await Cart.findOne({ user });

    if (cart) {
      // Update existing cart: push new items or update existing ones
      cartItems.forEach((newItem) => {
        const existingItem = cart.cartItems.find(
          (item) =>
            item.productId.toString() === newItem.productId &&
            item.selectedSize === newItem.selectedSize &&
            item.selectedColor === newItem.selectedColor
        );

        if (existingItem) {
          existingItem.quantity = newItem.quantity;
        } else {
          cart.cartItems.push(newItem);
        }
      });

      await cart.save();
    } else {
      // Create new cart
      cart = await Cart.create({ user, cartItems });
    }

    // Populate only selected fields of productId
    cart = await Cart.findOne({ user }).populate(
      "cartItems.productId",
      "prodname price images variants"
    );

    res.status(201).json({
      status: "success",
      message: "Cart created or updated successfully",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// GET All Carts (admin only)
const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find().populate("user", "fullname email");

    if (!carts) {
      return next(new AppError("No carts found", 404));
    }

    res.status(200).json({
      status: "success",
      results: carts.length,
      data: carts,
    });
  } catch (err) {
    next(err);
  }
};

// GET Single Cart by User
const getUserCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "cartItems.productId",
      "prodname images price variants"
    );

    if (!cart) {
      return next(new AppError("No cart found for that user", 404));
    }

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE Cart
const deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.params.userId });

    if (!cart) {
      return next(new AppError("No cart found with that user ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Cart deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Remove a Specific Item from the Cart
const removeCartItem = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId, selectedSize, selectedColor } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    // Remove matching cart item
    cart.cartItems = cart.cartItems.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        )
    );

    await cart.save();

    // Populate product info after item is removed
    cart = await Cart.findOne({ user: userId }).populate(
      "cartItems.productId",
      "prodname price images variants"
    );

    res.status(200).json({
      status: "success",
      message: "Item removed from cart successfully",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrUpdateCart,
  getAllCarts,
  getUserCart,
  deleteCart,
  removeCartItem,
};
