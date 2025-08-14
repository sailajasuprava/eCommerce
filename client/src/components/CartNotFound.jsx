import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function CartNotFound() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <ShoppingCart className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-600 mb-4">
        Explore our collection to find your perfect style!
      </p>
      <Link
        to="/products"
        className="btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
        aria-label="Shop now"
      >
        Shop Now
      </Link>
    </div>
  );
}

export default CartNotFound;
