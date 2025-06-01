
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GraduationCap, Briefcase, Medal, Shield, FileText, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);

  const mockData = {
    name: "Dr. Priya Sharma",
    email: "priya.sharma@bmsit.in",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    joinDate: "August 2022"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6F8] to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E2A38]">Staff Dashboard</h1>
          <p className="text-[#4A4A4A]">Welcome back, {mockData.name}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="border-[#00B8A9]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1E2A38]">
                  <div className="w-10 h-10 bg-[#1E2A38] rounded-full flex items-center justify-center text-white font-bold">
                    {mockData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-semibold text-[#1E2A38]">{mockData.name}</p>
                <p className="text-sm text-[#4A4A4A]">{mockData.designation}</p>
                <p className="text-sm text-[#4A4A4A]">{mockData.department}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full mt-4 border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="education" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5 bg-[#F4F6F8]">
                <TabsTrigger value="education" className="flex items-center gap-2 data-[state=active]:bg-[#00B8A9] data-[state=active]:text-white">
                  <GraduationCap className="w-4 h-4" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2 data-[state=active]:bg-[#00B8A9] data-[state=active]:text-white">
                  <Briefcase className="w-4 h-4" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="courses" className="flex items-center gap-2 data-[state=active]:bg-[#00B8A9] data-[state=active]:text-white">
                  <FileText className="w-4 h-4" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2 data-[state=active]:bg-[#00B8A9] data-[state=active]:text-white">
                  <Medal className="w-4 h-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="verification" className="flex items-center gap-2 data-[state=active]:bg-[#00B8A9] data-[state=active]:text-white">
                  <Shield className="w-4 h-4" />
                  Verification
                </TabsTrigger>
              </TabsList>

              <TabsContent value="education">
                <Card className="border-[#00B8A9]/20">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#1E2A38]">Education Details</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4 bg-[#F4F6F8]/50">
                        <h4 className="font-semibold text-[#1E2A38]">Ph.D. in Computer Science</h4>
                        <p className="text-[#4A4A4A]">Indian Institute of Science, Bangalore</p>
                        <p className="text-sm text-[#4A4A4A]">2018 • CGPA: 9.2/10</p>
                        <div className="mt-2 flex gap-2">
                          <Button variant="outline" size="sm">📎 View Certificate</Button>
                          <Button variant="outline" size="sm">📄 View Marksheet</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card className="border-[#00B8A9]/20">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#1E2A38]">Professional Experience</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4 bg-[#F4F6F8]/50">
                        <h4 className="font-semibold text-[#1E2A38]">Senior Software Engineer</h4>
                        <p className="text-[#4A4A4A]">Microsoft India</p>
                        <p className="text-sm text-[#4A4A4A]">2015 - 2020 • 5 years</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Experience Letter</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses">
                <Card className="border-[#00B8A9]/20">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#1E2A38]">Courses & Certifications</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4 bg-[#F4F6F8]/50">
                        <h4 className="font-semibold text-[#1E2A38]">Machine Learning Specialization</h4>
                        <p className="text-[#4A4A4A]">Coursera - Stanford University</p>
                        <p className="text-sm text-[#4A4A4A]">2023</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Certificate</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card className="border-[#00B8A9]/20">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#1E2A38]">Achievements & Awards</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4 bg-[#F4F6F8]/50">
                        <h4 className="font-semibold text-[#1E2A38]">Best Faculty Award</h4>
                        <p className="text-[#4A4A4A]">Outstanding contribution to research and teaching</p>
                        <p className="text-sm text-[#4A4A4A]">BMS Institute of Technology • 2024</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Certificate</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="verification">
                <Card className="border-[#00B8A9]/20">
                  <CardHeader>
                    <CardTitle className="text-[#1E2A38]">Verification Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4 bg-[#F4F6F8]/50">
                        <h4 className="font-semibold text-[#1E2A38]">Aadhaar Card</h4>
                        <p className="text-[#4A4A4A]">Identity Verification</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Document</Button>
                        </div>
                      </div>
                      <div className="border rounded p-4 bg-[#F4F6F8]/50">
                        <h4 className="font-semibold text-[#1E2A38]">Appointment Letter</h4>
                        <p className="text-[#4A4A4A]">Official appointment document</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Document</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
