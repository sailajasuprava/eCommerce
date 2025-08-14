import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "../components/Spinner";
import ProductNotFound from "../components/ProductNotFound";
import { useCloth } from "../context/ClothContext";
import Review from "../components/Review";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { clothes } = useCloth();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const [cloth, setCloth] = useState();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchACloth() {
      try {
        setIsLoading(true);
        const res = await axios.get(`/clothes/${id}`);
        setCloth(res.data.data);
        setReviews(res.data.data.reviews);
        setSelectedColor(res.data.data.variants[0].color);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchACloth();
  }, [id]);

  const isInWishlist = wishlist.some((item) => item.id === cloth?._id);

  if (isLoading) return <Spinner />;
  if (!cloth) return <ProductNotFound />;

  const {
    _id,
    prodname,
    description,
    fabric,
    category,
    fit,
    occasion,
    sleeveType,
    neckType,
    pattern,
    variants,
    price,
    discountPercent,
    offerPrice,
    images,
  } = cloth;

  const currentVariant = cloth?.variants?.find(
    (variant) => variant.color === selectedColor
  );

  const currentSizeStock =
    currentVariant?.sizes?.find((s) => s.size === selectedSize)?.stock || 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating =
    reviews.length > 0 ? (total / reviews.length).toFixed(1) : 0;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select both color and size");
      return;
    }

    addToCart({
      _id: cloth._id,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(cloth._id);
    } else {
      addToWishlist(cloth._id);
    }
  };

  const handleBuyNow = () => {
    navigate("/buy-now");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === cloth.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? cloth.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link
            to="/"
            className="hover:text-primary-700 transition-colors"
            aria-label="Go to home page"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/products"
            className="hover:text-primary-700 transition-colors"
            aria-label="Go to products page"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{prodname}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Product Images */}
        <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-4">
          {/* Thumbnail Column */}
          {images.length > 1 && (
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[600px]">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-primary-700"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/assets/placeholder.png"}
                    alt={`${prodname} image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Image with Arrows */}
          <div className="relative">
            <img
              src={images[currentImageIndex] || "/placeholder.png"}
              alt={prodname}
              className="w-full max-h-[800px] object-contain"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md hover:bg-gray-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2  p-2 rounded-full shadow-md hover:bg-gray-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {prodname}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 sm:w-5 h-4 sm:h-5 ${
                      i < Math.floor(avgRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm sm:text-base">
                ({reviews.length} reviews)
              </span>
            </div>

            {discountPercent ? (
              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ₹{offerPrice}
                </span>
                {price > offerPrice && (
                  <span className="text-lg sm:text-xl text-gray-500 line-through">
                    ₹{price}
                  </span>
                )}
                {price > offerPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                    Save ₹{(price - offerPrice).toFixed(2)}
                  </span>
                )}
              </div>
            ) : (
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                ₹{price}
              </div>
            )}

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b capitalize border-gray-200">
            <div>
              <span className="text-sm text-gray-500">occasion:</span>
              <p className="font-medium text-sm sm:text-base">{occasion}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Fit:</span>
              <p className="font-medium text-sm sm:text-base">{fit}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Fabric:</span>
              <p className="font-medium text-sm sm:text-base">{fabric}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Pattern:</span>
              <p className="font-medium text-sm sm:text-base">{pattern}</p>
            </div>

            {sleeveType && (
              <div>
                <span className="text-sm text-gray-500">Sleeve type:</span>
                <p className="font-medium text-sm sm:text-base">{sleeveType}</p>
              </div>
            )}

            {neckType && (
              <div>
                <span className="text-sm text-gray-500">Neck:</span>
                <p className="font-medium text-sm sm:text-base">{neckType}</p>
              </div>
            )}
          </div>

          {/* Color Selector */}
          <div>
            <h4 className="font-medium mb-1">Colours</h4>
            <div className="flex gap-2">
              {variants?.map((variant) => (
                <button
                  key={variant.color}
                  onClick={() => {
                    setSelectedColor(variant.color);
                    setSelectedSize(""); // reset size
                  }}
                  style={{ backgroundColor: variant.color.toLowerCase() }}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === variant.color
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          {selectedColor && (
            <div>
              <h4 className="font-medium mb-1 mt-4">Sizes</h4>
              <div className="flex gap-3 flex-wrap">
                {currentVariant?.sizes?.map(({ size, stock }) => (
                  <div key={size} className="relative">
                    <button
                      disabled={stock === 0}
                      onClick={() => setSelectedSize(size)}
                      className={`block h-12 w-12 rounded-full border ${
                        selectedSize === size
                          ? "border-black"
                          : "border-gray-300"
                      } ${
                        stock === 0
                          ? "opacity-50 cursor-not-allowed line-through"
                          : ""
                      }`}
                    >
                      {size}
                    </button>
                    {/* {stock > 0 && stock <= 2 && (
                      <span className="absolute text-xs bg-yellow-400 text-white left-1/2 transform -translate-x-1/2">
                        {stock} left
                      </span>
                    )} */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          {selectedColor && selectedSize && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border px-2 py-1 rounded"
              >
                {[...Array(Math.min(10, currentSizeStock)).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors duration-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
              aria-label={`Add ${prodname} to cart`}
            >
              <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 btn-primary bg-primary-800 text-white font-semibold hover:bg-primary-900 transition-colors duration-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
              aria-label={`Buy ${prodname} now`}
            >
              <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
              Buy Now
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`btn-outline border-primary-700 text-primary-700 font-semibold hover:bg-primary-50 transition-colors duration-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap ${
                isInWishlist ? "bg-primary-50 text-primary-700" : ""
              }`}
              aria-label={
                isInWishlist
                  ? `Remove ${prodname} from wishlist`
                  : `Add ${prodname} to wishlist`
              }
            >
              <Heart
                className={`w-4 sm:w-5 h-4 sm:h-5 ${
                  isInWishlist ? "fill-current" : ""
                }`}
              />
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <Truck className="w-4 sm:w-5 h-4 sm:h-5 text-primary-700" />
              <span className="text-gray-700 text-sm sm:text-base">
                Free shipping on orders over ₹5000
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-primary-700" />
              <span className="text-gray-700 text-sm sm:text-base">
                Secure payment processing
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-4 sm:w-5 h-4 sm:h-5 text-primary-700" />
              <span className="text-gray-700 text-sm sm:text-base">
                30-day return policy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {clothes
            .filter((p) => p.category === category && p._id !== _id)
            .slice(0, 4)
            .map((relatedProduct, index) => (
              <div
                key={relatedProduct.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={relatedProduct} />
              </div>
            ))}
        </div>
      </div>

      <Review clothId={_id} reviews={reviews} setReviews={setReviews} />
    </div>
  );
};

export default ProductDetail;
