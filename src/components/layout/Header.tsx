
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-200">
              <img 
                src="/lovable-uploads/7ca1c038-6de3-400d-a011-f40ed7173d81.png" 
                alt="BMS Institute of Technology Logo" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">ProFile</h1>
              <p className="text-sm text-slate-600">Professional Profile Manager</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">
              Home
            </Link>
            <a href="#about" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">
              Contact
            </a>
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-700 hover:bg-slate-50">
                Staff Login
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button variant="outline" size="sm" className="border-teal-500 text-teal-600 hover:bg-teal-50">
                Admin Login
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
