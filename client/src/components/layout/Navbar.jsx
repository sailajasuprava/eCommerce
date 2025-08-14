import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { toast } from "react-hot-toast";
import axios from "../../lib/axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { auth, setAuth, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { getTotalItems } = useCart();
  const { getTotalWishlistItems } = useWishlist();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      setIsLoading(true);
      const res = await axios.get("/auth/logout");
      toast.success(res.data.message);
      localStorage.removeItem("udsEcommerce");
      setAuth(null);
      setIsUserMenuOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const totalCartItems = getTotalItems();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Example</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-700 transition-colors"
              aria-label="Go to home page"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary-700 transition-colors"
              aria-label="Go to products page"
            >
              Products
            </Link>
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-700 text-sm"
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="ml-2 text-gray-700 hover:text-primary-700 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
              <Link
                to="/wishlist"
                className="relative text-gray-700 hover:text-primary-700 transition-colors"
                aria-label="Go to wishlist"
              >
                <Heart className="w-5 h-5" />
                {getTotalWishlistItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalWishlistItems()}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-primary-700 transition-colors"
                aria-label="Go to cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {auth ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-700 transition-colors"
                  aria-label={`Open user menu for ${auth?.fullname}`}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{auth?.fullname}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                      aria-label="Go to dashboard"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                      aria-label="View order history"
                    >
                      Order History
                    </Link>
                    {isAdmin && (
                      <>
                        <hr className="my-2" />
                        <Link
                          to="/admin/products"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                          aria-label="Manage products (admin)"
                        >
                          Admin Products
                        </Link>
                        <Link
                          to="/admin/orders"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                          aria-label="Manage orders (admin)"
                        >
                          Admin Orders
                        </Link>
                        <Link
                          to="/admin/users"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                          aria-label="Manage users (admin)"
                        >
                          Admin Users
                        </Link>
                      </>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-700 transition-colors"
                  aria-label="Go to login page"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors px-4 py-2 rounded-lg"
                  aria-label="Go to register page"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-700 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-700 text-sm"
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="text-gray-700 hover:text-primary-700 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-700 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Go to home page"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary-700 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Go to products page"
              >
                Products
              </Link>
              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-primary-700 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Go to wishlist"
              >
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-primary-700 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Go to cart"
              >
                Cart
              </Link>
              {auth ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-primary-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label="Go to dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="text-gray-700 hover:text-primary-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label="View orders"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="text-left text-gray-700 hover:text-primary-700 transition-colors"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label="Go to login page"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-primary-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label="Go to register page"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
