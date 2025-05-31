
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";

const StaffDetails = () => {
  const { staffId } = useParams();

  const mockStaffDetails = {
    id: staffId,
    name: "Dr. Priya Sharma",
    email: "priya.sharma@bmsit.in",
    phone: "+91 9876543210",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    joinDate: "August 15, 2022",
    address: "123 Faculty Colony, Bangalore - 560064",
    status: "Active",
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Indian Institute of Science, Bangalore",
        year: "2018",
        cgpa: "9.2/10",
        documents: ["degree.pdf", "marksheet.pdf"]
      }
    ],
    experience: [
      {
        role: "Senior Software Engineer",
        organization: "Microsoft India",
        duration: "2015 - 2020",
        documents: ["experience_letter.pdf"]
      }
    ],
    courses: [
      {
        name: "Machine Learning Specialization",
        platform: "Coursera - Stanford University",
        year: "2023",
        documents: ["ml_certificate.pdf"]
      }
    ],
    achievements: [
      {
        title: "Best Faculty Award",
        description: "Outstanding contribution to research and teaching",
        year: "2024",
        documents: ["award_certificate.pdf"]
      }
    ],
    verification: {
      aadhaar: "aadhaar_copy.pdf",
      appointmentLetter: "appointment_letter.pdf"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/admin-dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Staff Profile Details</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {mockStaffDetails.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-bold text-lg">{mockStaffDetails.name}</h3>
                  <p className="text-gray-600">{mockStaffDetails.designation}</p>
                  <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                    {mockStaffDetails.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <p className="font-medium">{mockStaffDetails.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone:</span>
                    <p className="font-medium">{mockStaffDetails.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Department:</span>
                    <p className="font-medium">{mockStaffDetails.department}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Join Date:</span>
                    <p className="font-medium">{mockStaffDetails.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                {mockStaffDetails.education.map((edu, index) => (
                  <div key={index} className="border rounded p-4">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year} • CGPA: {edu.cgpa}</p>
                    <div className="mt-3 flex gap-2">
                      {edu.documents.map((doc, docIndex) => (
                        <Button key={docIndex} variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          {doc}
                          <Download className="w-4 h-4 ml-2" />
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {mockStaffDetails.experience.map((exp, index) => (
                  <div key={index} className="border rounded p-4">
                    <h4 className="font-semibold">{exp.role}</h4>
                    <p className="text-gray-600">{exp.organization}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    <div className="mt-3 flex gap-2">
                      {exp.documents.map((doc, docIndex) => (
                        <Button key={docIndex} variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          {doc}
                          <Download className="w-4 h-4 ml-2" />
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verification Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded p-4">
                    <h4 className="font-semibold">Aadhaar Card</h4>
                    <p className="text-gray-600 text-sm">Identity Verification</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="w-4 h-4 mr-2" />
                      {mockStaffDetails.verification.aadhaar}
                      <Download className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-semibold">Appointment Letter</h4>
                    <p className="text-gray-600 text-sm">Official Document</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="w-4 h-4 mr-2" />
                      {mockStaffDetails.verification.appointmentLetter}
                      <Download className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StaffDetails;
