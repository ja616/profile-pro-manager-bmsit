import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import {
  GraduationCap,
  Briefcase,
  Award,
  FileCheck,
  Edit,
  User,
  FileText,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [staffData, setStaffData] = useState<any>(null);
  const staffId = localStorage.getItem("staff_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/staff/${staffId}`);
        const data = await res.json();
        setStaffData(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    if (staffId) fetchProfile();
  }, [staffId]);

  const handleEditProfile = () => {
  navigate("/signup", {
    state: {
      initialData: {
        ...staffData,
        id: staffData.staff_id, // ✅ this is what the form expects
      },
    },
  });
};


  if (!staffData) {
    return <p className="text-center mt-10 text-slate-600">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-white/90 shadow-lg border-slate-200">
          <CardHeader>
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 border-4 border-teal-100">
                <AvatarImage
                  src={
                    staffData.profile_picture
                      ? `http://localhost:5000/uploads/profile_pictures/${staffData.profile_picture}`
                      : ""
                  }
                  alt={staffData.name}
                />
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
              <Button className="bg-slate-800 hover:bg-slate-900" onClick={handleEditProfile}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {renderSection("Education", staffData.education, GraduationCap, (item) => (
            <>
              <h3 className="font-semibold text-slate-800">{item.degree}</h3>
              <p className="text-slate-600">{item.institution}</p>
              <p className="text-sm text-slate-500">
                Year: {item.year} | CGPA: {item.cgpa}
              </p>
              <div className="mt-2 flex gap-2">
                {item.degree_file && (
                  <a href={`http://localhost:5000/uploads/education/${item.degree_file}`} target="_blank">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Degree
                      <Download className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
                {item.marksheet_file && (
                  <a href={`http://localhost:5000/uploads/education/${item.marksheet_file}`} target="_blank">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Marksheet
                      <Download className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            </>
          ))}

          {renderSection("Experience", staffData.experience, Briefcase, (item) => (
            <>
              <h3 className="font-semibold text-slate-800">{item.role}</h3>
              <p className="text-slate-600">{item.organization}</p>
              <p className="text-sm text-slate-500">{item.duration}</p>
              {item.experience_file && (
                <a href={`http://localhost:5000/uploads/experience/${item.experience_file}`} target="_blank">
                  <Button variant="outline" size="sm" className="mt-2">
                    <FileText className="w-4 h-4 mr-2" />
                    Experience Letter
                    <Download className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              )}
            </>
          ))}

          {renderSection("Courses & Certifications", staffData.courses, Award, (item) => (
            <>
              <h3 className="font-semibold text-slate-800">{item.name}</h3>
              <p className="text-slate-600">{item.platform}</p>
              <p className="text-sm text-slate-500">Year: {item.year}</p>
              {item.course_file && (
                <a href={`http://localhost:5000/uploads/courses/${item.course_file}`} target="_blank">
                  <Button variant="outline" size="sm" className="mt-2">
                    <FileText className="w-4 h-4 mr-2" />
                    Certificate
                    <Download className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              )}
            </>
          ))}

          {renderSection("Achievements", staffData.achievements, Award, (item) => (
            <>
              <h3 className="font-semibold text-slate-800">{item.title}</h3>
              <p className="text-slate-600">{item.description}</p>
              <p className="text-sm text-slate-500">Year: {item.year}</p>
              {item.achievement_file && (
                <a href={`http://localhost:5000/uploads/achievements/${item.achievement_file}`} target="_blank">
                  <Button variant="outline" size="sm" className="mt-2">
                    <FileText className="w-4 h-4 mr-2" />
                    Certificate
                    <Download className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              )}
            </>
          ))}

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
                  {staffData.verification?.aadhaar_file ? (
                    <a
                      href={`http://localhost:5000/uploads/verification/${staffData.verification.aadhaar_file}`}
                      target="_blank"
                    >
                      <Button variant="outline" size="sm" className="mt-2">
                        <FileText className="w-4 h-4 mr-2" />
                        Aadhaar
                        <Download className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">Not uploaded</p>
                  )}
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-medium text-slate-800">Appointment Letter</h4>
                  {staffData.verification?.appointment_file ? (
                    <a
                      href={`http://localhost:5000/uploads/verification/${staffData.verification.appointment_file}`}
                      target="_blank"
                    >
                      <Button variant="outline" size="sm" className="mt-2">
                        <FileText className="w-4 h-4 mr-2" />
                        Appointment
                        <Download className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">Not uploaded</p>
                  )}
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

const renderSection = (
  title: string,
  items: any[],
  Icon: any,
  renderItem: (item: any) => JSX.Element
) => (
  <Card className="bg-white/90 shadow-lg border-slate-200">
    <CardHeader>
      <CardTitle className="text-slate-800 flex items-center">
        <Icon className="mr-2 h-6 w-6 text-teal-600" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {items?.map((item, index) => (
        <div key={index} className="border-l-4 border-teal-500 pl-4 mb-4">
          {renderItem(item)}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default Dashboard;
