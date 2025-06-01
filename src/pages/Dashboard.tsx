
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Briefcase, Award, FileCheck, Plus, Edit, User } from "lucide-react";

const Dashboard = () => {
  // Mock staff data - in real app this would come from API
  const staffData = {
    name: "Dr. Priya Sharma",
    email: "priya.sharma@bmsit.in",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    profilePicture: null, // This would be the uploaded image URL
    education: [
      { degree: "PhD Computer Science", institution: "IISc Bangalore", year: 2015, cgpa: 9.2 }
    ],
    experience: [
      { role: "Associate Professor", organization: "BMSIT", duration: "2018-Present" }
    ],
    courses: [
      { name: "Machine Learning Specialization", platform: "Coursera", year: 2020 }
    ],
    achievements: [
      { title: "Best Faculty Award", description: "Outstanding contribution to research", year: 2022 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-white/90 shadow-lg border-slate-200">
          <CardHeader>
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 border-4 border-teal-100">
                <AvatarImage src={staffData.profilePicture || ""} alt={staffData.name} />
                <AvatarFallback className="bg-teal-100 text-teal-700 text-2xl">
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-800">{staffData.name}</h1>
                <p className="text-lg text-slate-600">{staffData.designation}</p>
                <p className="text-teal-600">{staffData.department}</p>
                <p className="text-slate-500">{staffData.email}</p>
              </div>
              <Button className="bg-slate-800 hover:bg-slate-900">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile Picture
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {/* Education Section */}
          <Card className="bg-white/90 shadow-lg border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-800 flex items-center">
                  <GraduationCap className="mr-2 h-6 w-6 text-teal-600" />
                  Education
                </CardTitle>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-500 text-slate-600 hover:bg-slate-50">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {staffData.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4 mb-4">
                  <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                  <p className="text-slate-600">{edu.institution}</p>
                  <p className="text-sm text-slate-500">Year: {edu.year} | CGPA: {edu.cgpa}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="bg-white/90 shadow-lg border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-800 flex items-center">
                  <Briefcase className="mr-2 h-6 w-6 text-teal-600" />
                  Experience
                </CardTitle>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-500 text-slate-600 hover:bg-slate-50">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {staffData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4 mb-4">
                  <h3 className="font-semibold text-slate-800">{exp.role}</h3>
                  <p className="text-slate-600">{exp.organization}</p>
                  <p className="text-sm text-slate-500">{exp.duration}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Courses Section */}
          <Card className="bg-white/90 shadow-lg border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-800 flex items-center">
                  <Award className="mr-2 h-6 w-6 text-teal-600" />
                  Courses & Certifications
                </CardTitle>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-500 text-slate-600 hover:bg-slate-50">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {staffData.courses.map((course, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4 mb-4">
                  <h3 className="font-semibold text-slate-800">{course.name}</h3>
                  <p className="text-slate-600">{course.platform}</p>
                  <p className="text-sm text-slate-500">Year: {course.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements Section */}
          <Card className="bg-white/90 shadow-lg border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-800 flex items-center">
                  <Award className="mr-2 h-6 w-6 text-teal-600" />
                  Achievements
                </CardTitle>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-500 text-slate-600 hover:bg-slate-50">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {staffData.achievements.map((achievement, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4 mb-4">
                  <h3 className="font-semibold text-slate-800">{achievement.title}</h3>
                  <p className="text-slate-600">{achievement.description}</p>
                  <p className="text-sm text-slate-500">Year: {achievement.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Verification Section */}
          <Card className="bg-white/90 shadow-lg border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center">
                <FileCheck className="mr-2 h-6 w-6 text-teal-600" />
                Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium text-slate-800">Aadhaar Card</h4>
                  <p className="text-sm text-green-600">✓ Verified</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium text-slate-800">Appointment Letter</h4>
                  <p className="text-sm text-green-600">✓ Verified</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
