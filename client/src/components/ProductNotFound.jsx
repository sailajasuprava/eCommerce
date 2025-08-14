import { Link } from "react-router-dom";

function ProductNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <Link
          to="/products"
          className="btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors duration-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
          aria-label="Back to products"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductNotFound;
