import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartCard from "../components/CartCard";
import Spinner from "../components/Spinner";
import CartNotFound from "../components/CartNotFound";

const Cart = () => {
  const { cart, isLoading, getCartTotal } = useCart();

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <CartNotFound />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <CartCard key={item._id} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="card bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{getCartTotal() >= 5000 ? "Free" : "₹200.00"}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold items-center text-gray-900">
                  <span>Total</span>
                  <span>
                    ₹
                    {(getCartTotal() >= 5000
                      ? getCartTotal()
                      : getCartTotal() + 200
                    ).toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors px-4 py-3 rounded-lg"
                  aria-label="Proceed to checkout all items"
                >
                  Checkout All
                </button>
                <Link
                  to="/products"
                  className="block text-center text-primary-700 hover:text-primary-800 transition-colors"
                  aria-label="Continue shopping"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
