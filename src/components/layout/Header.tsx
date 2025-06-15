
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogoWithBgRemoval } from "@/components/LogoWithBgRemoval";

export const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-teal to-light-teal rounded-full flex items-center justify-center shadow-lg border-2 border-accent-teal p-1">
              <LogoWithBgRemoval 
                originalSrc="/lovable-uploads/7ca1c038-6de3-400d-a011-f40ed7173d81.png"
                alt="BMS Institute of Technology Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-navy to-accent-teal bg-clip-text text-transparent">
                ProFile
              </h1>
              <p className="text-sm text-medium-gray">Professional Profile Manager</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-dark-gray hover:text-accent-teal font-medium transition-colors duration-200">
              Home
            </Link>
            <a href="#about" className="text-dark-gray hover:text-accent-teal font-medium transition-colors duration-200">
              About
            </a>
            <a href="#contact" className="text-dark-gray hover:text-accent-teal font-medium transition-colors duration-200">
              Contact
            </a>
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-all duration-200">
                Staff Login
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button size="sm" className="bg-gradient-to-r from-accent-teal to-light-teal text-white hover:from-accent-teal hover:to-accent-teal transition-all duration-200 shadow-lg">
                Admin Login
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
