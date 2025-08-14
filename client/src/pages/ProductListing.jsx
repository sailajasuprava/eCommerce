import { useState, useMemo } from "react";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useCloth } from "../context/ClothContext";
import ProductCardInListView from "../components/ProductCardInListView";

const ProductListing = () => {
  const [filters, setFilters] = useState({
    category: "All",
    occasion: "All",
    fit: "All",
    pattern: "All",
    priceRange: [0, 20000],
    sortBy: "prodname",
  });
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { clothes } = useCloth();

  const filteredProducts = useMemo(() => {
    const filtered = clothes.filter((product) => {
      if (filters.category !== "All" && product.category !== filters.category)
        return false;
      if (filters.occasion !== "All" && product.occasion !== filters.occasion)
        return false;
      if (filters.fit !== "All" && product.fit !== filters.fit) return false;
      if (filters.pattern !== "All" && product.pattern !== filters.pattern)
        return false;
      if (product.price > filters.priceRange[1]) return false;
      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return a.prodname.localeCompare(b.prodname);
      }
    });

    return filtered;
  }, [filters, clothes]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">
                Showing {filteredProducts.length} of {clothes.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden btn-outline flex items-center gap-2 border-primary-700 text-primary-700 hover:bg-primary-50 transition-colors px-4 py-2 rounded-lg"
                aria-label="Open filters"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length > 0 ? (
            <div
              className={`
              ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            `}
            >
              {filteredProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {viewMode === "grid" ? (
                    <ProductCard product={product} />
                  ) : (
                    <ProductCardInListView product={product} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to see more products
              </p>
              <button
                onClick={() =>
                  setFilters({
                    category: "All",
                    occasion: "All",
                    fit: "All",
                    pattern: "All",
                    priceRange: [0, 20000],
                    sortBy: "prodname",
                  })
                }
                className="btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors px-4 py-2 rounded-lg"
                aria-label="Clear filters"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
