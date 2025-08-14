import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function WishlistCard({ product }) {
  const { removeFromWishlist } = useWishlist();

  const { prodname, price, offerPrice, discountPercent, images } = product;

  return (
    <div className="w-44 sm:w-64 bg-white shadow rounded relative overflow-hidden">
      <button
        onClick={() => removeFromWishlist(product._id)}
        className="absolute top-2 right-2 z-10 bg-white text-gray-700 rounded-full w-6 h-6 flex items-center justify-center shadow"
      >
        ✕
      </button>

      <Link
        to={`/product/${product._id}`}
        className="group"
        aria-label={`View details for ${product.prodname}`}
      >
        <div>
          <img
            src={images[0] || "/placeholder.png"}
            alt={prodname}
            className="w-full h-80 object-cover"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3 space-y-1">
        <h3 className="text-gray-600 leading-tight">{prodname}</h3>

        {discountPercent !== 0 ? (
          <div className="space-x-2  text-lg">
            <span className="text-black font-bold">₹{offerPrice}</span>
            <span className="text-gray-500 line-through">₹{price}</span>
          </div>
        ) : (
          <span className="text-black font-bold text-lg">₹{price}</span>
        )}
      </div>
    </div>
  );
}

export default WishlistCard;

{
  /* <div className="card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <ProductCard product={product} />
        <div className="p-4 flex justify-between">
          <button
            onClick={() => removeFromWishlist(product.id)}
            className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-2"
            aria-label={`Remove ${product.name} from wishlist`}
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div> */
}
