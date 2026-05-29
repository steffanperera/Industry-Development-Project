import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl text-green-600">CareAble</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <HashLink
          to="/#features" className="text-gray-700 hover:text-green-600 transition-colors">
              Features
            </HashLink>
            <HashLink
          to="/#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">
              How It Works
              </HashLink>
            <Link
          to="/aboutus" className="text-gray-700 hover:text-green-600 transition-colors">
              About Us
            </Link>
            <Link
          to="/contactus" className="text-gray-700 hover:text-green-600 transition-colors">
              Contact Us
            </Link>

          
            
        <Link
          to="/signin"
          className="px-4 py-2 text-green-600 hover:text-green-700 transition-colors"
        >
          Sign In
        </Link>
      
            <Link
          to="/register" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Register Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">
                About
              </a>
              <button className="text-left text-green-600 hover:text-green-700 transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-left">
                Register Now
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}