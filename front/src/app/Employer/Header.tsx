import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { 
  LogOut ,User
} from 'lucide-react'; // Example using Lucide icons

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl text-green-600">CareAble - Employer</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
           
      
            <Link
          to="/Signin" className="flex px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <span>Log Out </span>
            <LogOut className="ml-3 w-5 h-5 text-white-400 group-hover:text-indigo-400 transition-colors" />
              
            </Link>
            <User className="ml-3 w-5 h-5 text-white-400 group-hover:text-indigo-400 transition-colors" />
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
       
      </div>
    </header>
  );
}