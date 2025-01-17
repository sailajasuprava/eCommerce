import { Link } from "react-router-dom";
import { UserPlus, LogIn } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex"
          >
            E-Commerce
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300
           ease-in-out"
            >
              Home
            </Link>

            <Link
              to={"/signup"}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
                          rounded-md flex items-center transition duration-300 ease-in-out"
            >
              <UserPlus className="mr-2" size={18} />
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                          rounded-md flex items-center transition duration-300 ease-in-out"
            >
              <LogIn className="mr-2" size={18} />
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;