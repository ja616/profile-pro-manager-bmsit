
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#1E2A38] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BMS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E2A38]">ProFile</h1>
              <p className="text-sm text-[#4A4A4A]">Professional Profile Manager</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-[#4A4A4A] hover:text-[#00B8A9] font-medium transition-colors">
              Home
            </Link>
            <a href="#about" className="text-[#4A4A4A] hover:text-[#00B8A9] font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-[#4A4A4A] hover:text-[#00B8A9] font-medium transition-colors">
              Contact
            </a>
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-[#1E2A38] text-[#1E2A38] hover:bg-[#F4F6F8]">Staff Login</Button>
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
