
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Users, Shield, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            Welcome to the Technical Staff Management System
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            of <strong>BMS Institute of Technology</strong>
          </p>
          <p className="text-lg text-teal-600 mb-12 font-semibold">
            Secure. Verified. Staff Data – Simplified.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-slate-800 text-white hover:bg-slate-900 shadow-lg">
                <Users className="mr-2 h-5 w-5" />
                Staff Signup
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-700 hover:bg-slate-50 shadow-lg">
                Staff Login
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button size="lg" variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50 shadow-lg">
                <Shield className="mr-2 h-5 w-5" />
                Admin Access
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-slate-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center">
                <Users className="mr-2 h-6 w-6 text-teal-600" />
                Staff Profiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Comprehensive staff profile management with education, experience, and achievements tracking.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center">
                <FileText className="mr-2 h-6 w-6 text-teal-600" />
                Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Secure document upload and verification system for credentials and certificates.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center">
                <Shield className="mr-2 h-6 w-6 text-teal-600" />
                Admin Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Administrative dashboard for managing staff data and approval workflows.</p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <section id="about" className="mb-16">
          <Card className="bg-white/90 shadow-lg border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 text-center">About ProFile</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 max-w-2xl mx-auto">
                ProFile is a comprehensive staff management system designed specifically for BMS Institute of Technology. 
                It provides a secure platform for staff to maintain their professional profiles and for administrators 
                to efficiently manage and verify staff information. Our system ensures data integrity, security, and 
                easy access to verified staff credentials.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
