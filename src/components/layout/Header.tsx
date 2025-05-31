
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BMS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ProFile</h1>
              <p className="text-sm text-gray-600">Professional Profile Manager</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">Staff Login</Button>
            </Link>
            <Link to="/admin-login">
              <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                Admin Login
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
