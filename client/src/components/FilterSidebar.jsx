import { X } from "lucide-react";
import { categories, occasions, fits, patterns } from "../utils/mockData";

const FilterSidebar = ({ filters, setFilters, isOpen, onClose }) => {
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "All",
      occasion: "All",
      fit: "All",
      pattern: "All",
      priceRange: [0, 20000],
      sortBy: "prodname",
    });
  };

  const FilterSection = ({ title, options, filterKey, currentValue }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name={filterKey}
            value={"All"}
            checked={currentValue === "All"}
            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
            className="mr-2 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-gray-700">All</span>
        </label>

        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={filterKey}
              value={option}
              checked={currentValue === option}
              onChange={(e) => handleFilterChange(filterKey, e.target.value)}
              className="mr-2 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg lg:shadow-none
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        <div className="p-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Filter Sections */}
          <FilterSection
            title="Category"
            options={categories}
            filterKey="category"
            currentValue={filters.category}
          />

          <FilterSection
            title="Occasion"
            options={occasions}
            filterKey="occasion"
            currentValue={filters.occasion}
          />

          <FilterSection
            title="Fit"
            options={fits}
            filterKey="fit"
            currentValue={filters.fit}
          />

          <FilterSection
            title="Design"
            options={patterns}
            filterKey="pattern"
            currentValue={filters.pattern}
          />

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="20000"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    0,
                    Number.parseInt(e.target.value),
                  ])
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹0</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full input-field"
            >
              <option value="prodname">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Mobile Clear Button */}
          <button
            onClick={clearFilters}
            className="w-full btn-secondary lg:hidden"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
