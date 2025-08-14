import { useWishlist } from "../context/WishlistContext";
import WishlistNotFound from "../components/WishlistNotFound";
import WishlistCard from "../components/WishlistCard";
import Spinner from "../components/Spinner";

const Wishlist = () => {
  const { wishlist, isLoading } = useWishlist();

  console.log(wishlist);

  if (isLoading) return <Spinner />;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <WishlistNotFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {wishlist.map((product, index) => (
            <WishlistCard key={index} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
