
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GraduationCap, Briefcase, Medal, Shield, FileText, Edit } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="text-gray-600">Welcome back, {mockData.name}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {mockData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-semibold">{mockData.name}</p>
                <p className="text-sm text-gray-600">{mockData.designation}</p>
                <p className="text-sm text-gray-600">{mockData.department}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full mt-4"
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Medal className="w-4 h-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="verification" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Verification
                </TabsTrigger>
              </TabsList>

              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">Ph.D. in Computer Science</h4>
                        <p className="text-gray-600">Indian Institute of Science, Bangalore</p>
                        <p className="text-sm text-gray-500">2018 • CGPA: 9.2/10</p>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">Senior Software Engineer</h4>
                        <p className="text-gray-600">Microsoft India</p>
                        <p className="text-sm text-gray-500">2015 - 2020 • 5 years</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Experience Letter</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Courses & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">Machine Learning Specialization</h4>
                        <p className="text-gray-600">Coursera - Stanford University</p>
                        <p className="text-sm text-gray-500">2023</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Certificate</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements & Awards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">Best Faculty Award</h4>
                        <p className="text-gray-600">Outstanding contribution to research and teaching</p>
                        <p className="text-sm text-gray-500">BMS Institute of Technology • 2024</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Certificate</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="verification">
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">Aadhaar Card</h4>
                        <p className="text-gray-600">Identity Verification</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">📎 View Document</Button>
                        </div>
                      </div>
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">Appointment Letter</h4>
                        <p className="text-gray-600">Official appointment document</p>
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
