
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Users, Shield, Database, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-gray via-white to-light-teal/10">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-primary-navy via-secondary-blue to-accent-teal text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to the Technical Staff
                <span className="text-light-teal block mt-2"> Management System</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed">
                Secure. Verified. Staff Data – Simplified.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-accent-teal to-light-teal hover:from-light-teal hover:to-accent-teal text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Users className="mr-2 h-5 w-5" />
                    Staff Registration
                  </Button>
                </Link>
                <Link to="/admin-login">
                  <Button variant="outline" size="lg" className="border-2 border-light-teal text-light-teal hover:bg-light-teal hover:text-primary-navy px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-white/10 backdrop-blur-sm">
                    <Shield className="mr-2 h-5 w-5" />
                    Admin Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-navy to-accent-teal bg-clip-text text-transparent mb-6">
                  About ProFile System
                </h2>
                <p className="text-lg text-medium-gray max-w-3xl mx-auto leading-relaxed">
                  A comprehensive digital platform designed specifically for BMS Institute of Technology 
                  to streamline staff data management, verification, and administrative processes.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="border-2 border-slate-200 hover:border-accent-teal transition-all duration-300 hover:shadow-lg group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent-teal to-light-teal rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-primary-navy">Secure Data Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-medium-gray text-center">
                      Advanced encryption and secure storage for all staff documents and personal information.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-slate-200 hover:border-success-green transition-all duration-300 hover:shadow-lg group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-success-green to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-primary-navy">Document Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-medium-gray text-center">
                      Streamlined verification process for educational certificates, experience letters, and achievements.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-slate-200 hover:border-accent-purple transition-all duration-300 hover:shadow-lg group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent-purple to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-primary-navy">Role-Based Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-medium-gray text-center">
                      Differentiated access levels for staff members and administrators with comprehensive controls.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-soft-gray to-slate-100 rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-navy mb-6">
                      Why Choose ProFile?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-success-green mt-0.5 flex-shrink-0" />
                        <p className="text-dark-gray">Paperless documentation and instant access to records</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-success-green mt-0.5 flex-shrink-0" />
                        <p className="text-dark-gray">Real-time updates and notifications for all stakeholders</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-success-green mt-0.5 flex-shrink-0" />
                        <p className="text-dark-gray">Comprehensive audit trails and compliance reporting</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-success-green mt-0.5 flex-shrink-0" />
                        <p className="text-dark-gray">Mobile-responsive design for access anywhere, anytime</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                      <div className="text-4xl font-bold text-accent-teal mb-2">500+</div>
                      <p className="text-medium-gray mb-4">Staff Members Registered</p>
                      <div className="text-4xl font-bold text-success-green mb-2">99.9%</div>
                      <p className="text-medium-gray">System Uptime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-16 px-4 bg-gradient-to-r from-soft-gray to-light-teal/20">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-navy to-accent-teal bg-clip-text text-transparent mb-8">
                Quick Access Portal
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <Link to="/login">
                  <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-teal cursor-pointer h-full group bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-accent-teal to-light-teal rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-xl text-primary-navy">Staff Portal</CardTitle>
                      <CardDescription className="text-medium-gray">
                        Access your profile, update information, and manage your documents
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link to="/admin-login">
                  <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-purple cursor-pointer h-full group bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-accent-purple to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-xl text-primary-navy">Admin Dashboard</CardTitle>
                      <CardDescription className="text-medium-gray">
                        Manage staff profiles, review documents, and system administration
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
