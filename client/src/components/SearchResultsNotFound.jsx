import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

function SearchResultsNotFound() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <SearchIcon className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-600 mb-4">
        Try a different search term to find your perfect style
      </p>
      <Link
        to="/products"
        className="btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
        aria-label="Shop all products"
      >
        Shop All Products
      </Link>
    </div>
  );
}

export default SearchResultsNotFound;
