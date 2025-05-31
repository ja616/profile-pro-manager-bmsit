
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { GraduationCap, Shield, FileText, Medal } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to the Technical Staff Management System
          </h1>
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">
            BMS Institute of Technology
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Secure. Verified. Staff Data – Simplified.
          </p>
        </div>

        {/* Main Action Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Professional Profile Manager
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Manage your professional profile and documents securely
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Link to="/signup" className="block">
                  <Button className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                    <GraduationCap className="mr-3 h-6 w-6" />
                    Staff Signup / Login
                  </Button>
                </Link>
                
                <Link to="/admin-login" className="block">
                  <Button variant="outline" className="w-full h-16 text-lg border-red-200 text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-105">
                    <Shield className="mr-3 h-6 w-6" />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Secure Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Upload and manage all your professional documents securely in one place.</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Verified Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">All staff profiles are verified and maintained with institutional standards.</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Medal className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
              <CardTitle>Achievement Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Showcase your certifications, courses, and professional achievements.</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
