import { useLocation, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCloth } from "../context/ClothContext";
import SearchResultsNotFound from "../components/SearchResultsNotFound";

const Search = () => {
  const { clothes } = useCloth();
  const location = useLocation();

  const query =
    new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const searchResults = clothes?.filter(
    (product) =>
      product.prodname.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Search Results for "{query}"
      </h1>

      {searchResults.length === 0 ? (
        <SearchResultsNotFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {searchResults.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
