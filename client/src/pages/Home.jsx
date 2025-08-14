import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RefreshCw, Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useCloth } from "../context/ClothContext";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { clothes } = useCloth();

  const featuredProducts = clothes?.slice(0, 4);

  const heroSlides = [
    {
      text: "Discover Your Signature Style",
      subtext:
        "Shop our exclusive collection of premium clothing, crafted for elegance and comfort.",
      image:
        "https://static3.azafashions.com/uploads/landing_page_section_content_image/1748583124744roka-radiance.png",
    },
    {
      text: "Discover Your Signature Style",
      subtext:
        "Shop our exclusive collection of premium clothing, crafted for elegance and comfort.",
      image:
        "https://www.azafashions.com/blog/wp-content/uploads/2023/04/menswear.jpg",
    },
    {
      text: "Discover Your Signature Style",
      subtext:
        "Shop our exclusive collection of premium clothing, crafted for elegance and comfort.",
      image:
        "https://www.azafashions.com/blog/wp-content/uploads/2023/04/Womenswear-2.jpg",
    },
    {
      text: "Discover Your Signature Style",
      subtext:
        "Shop our exclusive collection of premium clothing, crafted for elegance and comfort.",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2024/9/452918015/RV/EX/FL/12678962/bunty-bubly-combo-men-and-women-matching-outfits.jpg",
    },
  ];

  // Auto-slide for hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="animate-fade-in">
      {/* Hero Carousel */}
      <section className="relative bg-white text-white overflow-hidden mx-[5%] rounded-xl my-3">
        <div className="absolute inset-0 bg-white z-10 sm:hidden" />
        <div className="relative z-20">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {heroSlides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-16">
                    {/* Mobile View: Background Image with Text Overlay */}
                    <div
                      className="relative h-[70vh] sm:h-auto bg-cover bg-center rounded-xl sm:bg-white sm:grid sm:grid-cols-1 sm:lg:grid-cols-2 sm:gap-10 lg:gap-12 sm:items-center"
                      style={{
                        backgroundImage:
                          window.innerWidth < 640
                            ? `url(${slide.image})`
                            : "none",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/50 rounded-xl sm:hidden" />
                      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-0 sm:text-left sm:flex sm:flex-col sm:justify-start sm:items-start sm:animate-slide-up sm:text-gray-900">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-lg sm:drop-shadow-none">
                          {slide.text}
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-primary-100 sm:text-gray-600 leading-relaxed max-w-md">
                          {slide.subtext}
                        </p>
                        <Link
                          to="/products"
                          className="btn-primary bg-gradient-to-r from-white to-gray-100 sm:from-primary-700 sm:to-primary-800 text-primary-800 sm:text-white font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-full flex items-center gap-2"
                          aria-label="Shop the latest collection"
                        >
                          Shop Now
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                      {/* Desktop/Laptop View: Separate Image */}
                      <div
                        className={`hidden sm:block relative animate-scale-in ${
                          index % 2 === 1 ? "order-first" : ""
                        }`}
                      >
                        <div className="bg-white rounded-xl" />
                        <img
                          src={slide.image}
                          alt="Showcase of premium clothing"
                          className="w-full h-auto max-h-[450px] lg:max-h-[500px] rounded-xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2 z-50">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white sm:bg-primary-700 scale-100"
                    : "bg-gray-400 scale-75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience unlimited quality and support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12">
            {[
              {
                icon: Truck,
                title: "Complimentary Shipping",
                desc: "Free shipping on orders above ₹5000",
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                desc: "100% secure payment processing",
              },
              {
                icon: RefreshCw,
                title: "Hassle-Free Returns",
                desc: "30-day return policy for easy exchanges",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center animate-slide-up group hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-300 transition-colors duration-300">
                  <feature.icon
                    className="w-8 h-8 text-primary-800"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products (Static Grid) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium styles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product._id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/products"
              className="btn-primary bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors duration-300 px-6 py-3 rounded-lg inline-flex items-center gap-2"
              aria-label="View all products"
            >
              Browse All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Find your perfect outfit for any occasion.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Casual",
                image:
                  "https://www.textileinfomedia.com/img/enlo/new-collection-casual-shirt-for-men-full.jpg",
              },
              {
                name: "Formal",
                image:
                  "https://dummyimage.com/400x300/333/fff&text=Formal+Placeholder",
              },
              {
                name: "Party",
                image:
                  "https://dummyimage.com/400x300/333/fff&text=Party+Placeholder",
              },
              {
                name: "Sports",
                image:
                  "https://dummyimage.com/400x300/333/fff&text=Sports+Placeholder",
              },
              {
                name: "Ethnic",
                image:
                  "https://dummyimage.com/400x300/333/fff&text=Ethnic+Placeholder",
              },
            ].map((category, index) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group animate-scale-in-out"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={`Shop ${category.name} collection`}
              >
                <div className="card bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                  <img
                    src={category.image}
                    alt={`${category.name} clothing collection`}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-primary-800 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg">
              Hear from those who love our styles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anika Patel",
                text: "The quality of the kurta was beyond my expectations. Perfect fit and vibrant colors!",
                rating: 5,
              },
              {
                name: "Rohan Sharma",
                text: "Fast shipping and excellent customer support. My go-to for casual shirts.",
                rating: 4.5,
              },
              {
                name: "Priya Mehra",
                text: "Loved the party top! It made me stand out at the event.",
                rating: 4.8,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(testimonial.rating)
                          ? "text-yellow-1000"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Our Story Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Discover Our Story
          </h2>
          <p className="text-primary-100 mb-8 text-lg max-w-2xl mx-auto">
            We are passionate about delivering premium clothing that blends
            timeless elegance with modern comfort. Explore our curated
            collections crafted with care.
          </p>
          <Link
            to="/products"
            className="btn-primary bg-gradient-to-r from-white to-gray-100 text-primary-800 font-bold rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-75 px-6 py-3 inline-flex items-center"
            aria-label="Shop our collections"
          >
            Shop Our Collections
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
