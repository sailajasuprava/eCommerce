import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };
  const { _id, prodname, category, images, price, originalPrice, reviews } =
    product;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating =
    reviews.length > 0 ? (total / reviews.length).toFixed(1) : 0;

  return (
    <Link
      to={`/product/${_id}`}
      className="group"
      aria-label={`View details for ${prodname}`}
    >
      <div className="card hover-lift smooth-transition bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            src={images[0] || "/placeholder.png"}
            alt={prodname}
            className="w-full h-80 object-cover group-hover:scale-105 smooth-transition"
          />
          {originalPrice > price && (
            <div className="absolute top-2 left-2 bg-transperent text-white px-2 py-1 rounded-md text-sm font-medium"></div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 smooth-transition">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full shadow-md transition-colors ${
                isInWishlist
                  ? "bg-primary-700 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              aria-label={
                isInWishlist
                  ? `Remove ${prodname} from wishlist`
                  : `Add ${prodname} to wishlist`
              }
            >
              <Heart
                className={`w-4 h-4 ${
                  isInWishlist ? "fill-current" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
            {prodname}
          </h3>

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
            <span className="text-sm text-gray-600 ml-2">
              ({reviews.length})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">₹{price}</span>
              {originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            <div className="flex space-x-1">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
