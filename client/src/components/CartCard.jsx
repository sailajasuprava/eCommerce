import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";

function CartCard({ item, index }) {
  const { updateQuantity, removeFromCart } = useCart();

  const {
    productId: { _id, prodname, price, variants, images },
    selectedSize,
    selectedColor,
    quantity,
  } = item;

  const currentVariant = variants?.find(
    (variant) => variant.color === selectedColor
  );

  const currentSizeStock =
    currentVariant?.sizes?.find((s) => s.size === selectedSize)?.stock || 0;
  return (
    <div
      className="card flex flex-col sm:flex-row bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <img
        src={images[0] || "/placeholder.png"}
        alt={prodname}
        className="w-full sm:w-48 h-48 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
      />
      <div className="p-4 sm:p-6 flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{prodname}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm sm:text-base">
              Size: {selectedSize || "N/A"}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Color: {selectedColor || "N/A"}
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  updateQuantity(
                    _id,
                    selectedSize,
                    selectedColor,
                    quantity - 1,
                    currentSizeStock
                  )
                }
                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label={`Decrease quantity of ${item.productId.prodname}`}
              >
                -
              </button>
              <span className="text-base sm:text-lg font-medium w-10 text-center">
                {item.quantity || 1}
              </span>
              <button
                onClick={() =>
                  updateQuantity(
                    _id,
                    selectedSize,
                    selectedColor,
                    quantity + 1,
                    currentSizeStock
                  )
                }
                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label={`Increase quantity of ${prodname}`}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ₹{((Number(price) || 0) * (Number(quantity) || 1)).toFixed(2)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => removeFromCart(_id, selectedSize, selectedColor)}
                className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-2"
                aria-label={`Remove ${prodname} from cart`}
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
              <Link
                to={`/product/${_id}`}
                className="btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors px-4 py-2 rounded-lg"
                aria-label={`Checkout for ${prodname}`}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
