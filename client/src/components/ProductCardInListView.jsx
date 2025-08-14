import { Star } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

function ProductCardInListView({ product }) {
  const { addToWishlist } = useWishlist();

  const { _id, prodname, category, images, price, originalPrice, reviews } =
    product;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating =
    reviews.length > 0 ? (total / reviews.length).toFixed(1) : 0;

  return (
    <div className="card flex flex-col sm:flex-row bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={images[0] || "/placeholder.png"}
        alt={prodname}
        className="w-full sm:w-48 h-48 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
      />
      <div className="p-4 sm:p-6 flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{prodname}</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-4">{category}</p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(avgRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({reviews.length})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ₹{price}
            </span>
            {originalPrice > price && (
              <span className="text-sm sm:text-lg text-gray-500 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => addToWishlist(_id)}
            className="btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors px-4 py-2 rounded-lg"
            aria-label={`Add ${prodname} to cart`}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCardInListView;
