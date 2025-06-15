
export const Footer = () => {
  return (
    <footer id="contact" className="gradient-bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent-teal rounded-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/7ca1c038-6de3-400d-a011-f40ed7173d81.png" 
                  alt="BMS Institute of Technology Logo" 
                  className="w-10 h-10 object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl font-bold">ProFile</h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Leading technical education institute committed to excellence in engineering and technology. 
              Empowering future innovators through comprehensive staff management solutions.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-accent-teal/20 rounded-full flex items-center justify-center hover:bg-accent-teal transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-accent-teal/20 rounded-full flex items-center justify-center hover:bg-accent-teal transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-accent-teal/20 rounded-full flex items-center justify-center hover:bg-accent-teal transition-colors cursor-pointer">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-light-teal">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-teal/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">📧</span>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">contact@bmsit.in</p>
                  <p className="text-slate-400 text-sm">General Inquiries</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-teal/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">📞</span>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">+91 80 2861 3620</p>
                  <p className="text-slate-400 text-sm">Administrative Office</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-teal/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">📍</span>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Bangalore, Karnataka</p>
                  <p className="text-slate-400 text-sm">India - 560064</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-light-teal">Quick Links</h4>
            <div className="space-y-3">
              <a href="/login" className="block text-slate-300 hover:text-light-teal transition-colors duration-200 flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent-teal rounded-full"></span>
                <span>Staff Portal</span>
              </a>
              <a href="/admin-login" className="block text-slate-300 hover:text-light-teal transition-colors duration-200 flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent-teal rounded-full"></span>
                <span>Admin Dashboard</span>
              </a>
              <a href="#about" className="block text-slate-300 hover:text-light-teal transition-colors duration-200 flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent-teal rounded-full"></span>
                <span>About System</span>
              </a>
              <a href="#contact" className="block text-slate-300 hover:text-light-teal transition-colors duration-200 flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent-teal rounded-full"></span>
                <span>Support Center</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-center md:text-left">
              © 2025 ProFile - Staff Management System | BMS Institute of Technology
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-light-teal transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-light-teal transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-light-teal transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
