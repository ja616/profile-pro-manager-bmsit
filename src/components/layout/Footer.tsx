
export const Footer = () => {
  return (
    <footer id="contact" className="bg-[#1E2A38] text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BMS Institute of Technology</h3>
            <p className="text-gray-300">
              Leading technical education institute committed to excellence in engineering and technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <p className="text-gray-300 mb-2">📧 contact@bmsit.in</p>
            <p className="text-gray-300">📞 +91 80 2861 3620</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Staff Portal</p>
              <p className="text-gray-300">Admin Dashboard</p>
              <p className="text-gray-300">Help & Support</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 Staff Management System - BMS Institute of Technology</p>
        </div>
      </div>
    </footer>
  );
};
