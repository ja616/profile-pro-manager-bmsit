import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";

const StaffDetails = () => {
  const { staffId } = useParams();
  const [staff, setStaff] = useState<any>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/staff/${staffId}`);
        const data = await res.json();
        setStaff(data);
      } catch (error) {
        console.error("Error fetching staff details:", error);
      }
    };

    fetchStaff();
  }, [staffId]);

  if (!staff) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading staff details...</p>
      </div>
    );
  }

  const downloadBtn = (label: string, file: string, folder: string) => (
    <a
      href={`http://localhost:5000/uploads/${folder}/${file}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="outline" size="sm" className="mt-2">
        <FileText className="w-4 h-4 mr-2" />
        {label}
        <Download className="w-4 h-4 ml-2" />
      </Button>
    </a>
  );

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
          {/* Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader><CardTitle>Profile Overview</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {staff.name?.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="font-bold text-lg">{staff.name}</h3>
                  <p className="text-gray-600">{staff.designation}</p>
                  <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                    {staff.is_verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <p><strong>Email:</strong> {staff.email}</p>
                  <p><strong>Phone:</strong> {staff.phone}</p>
                  <p><strong>Department:</strong> {staff.department}</p>
                  <p><strong>Join Date:</strong> {new Date(staff.join_date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Education */}
            <Card>
              <CardHeader><CardTitle>Education</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {staff.education?.map((edu, i) => (
                  <div key={i} className="border p-4 rounded">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p>{edu.institution}</p>
                    <p className="text-sm text-gray-500">Year: {edu.year} | CGPA: {edu.cgpa}</p>
                    <div className="flex gap-2 mt-2">
                      {edu.degree_file && downloadBtn("Degree", edu.degree_file, "education")}
                      {edu.marksheet_file && downloadBtn("Marksheet", edu.marksheet_file, "education")}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {staff.experience?.map((exp, i) => (
                  <div key={i} className="border p-4 rounded">
                    <h4 className="font-semibold">{exp.role}</h4>
                    <p>{exp.organization}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    {exp.description && <p className="text-sm mt-2">{exp.description}</p>}
                    {exp.experience_file && downloadBtn("Experience File", exp.experience_file, "experience")}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Courses */}
            {staff.courses?.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Courses & Certifications</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {staff.courses.map((c, i) => (
                    <div key={i} className="border p-4 rounded">
                      <h4 className="font-semibold">{c.name}</h4>
                      <p>{c.platform}</p>
                      <p className="text-sm text-gray-500">Year: {c.year}</p>
                      {c.course_file && downloadBtn("Certificate", c.course_file, "courses")}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            {staff.achievements?.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {staff.achievements.map((ach, i) => (
                    <div key={i} className="border p-4 rounded">
                      <h4 className="font-semibold">{ach.title}</h4>
                      <p>{ach.description}</p>
                      <p className="text-sm text-gray-500">Year: {ach.year}</p>
                      {ach.achievement_file && downloadBtn("Certificate", ach.achievement_file, "achievements")}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Verification */}
            <Card>
              <CardHeader><CardTitle>Verification Documents</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="border p-4 rounded">
                  <h4 className="font-semibold">Aadhaar Card</h4>
                  {staff.verification?.aadhaar_file
                    ? downloadBtn("Aadhaar", staff.verification.aadhaar_file, "verification")
                    : <p className="text-sm text-gray-500 mt-2">Not uploaded</p>}
                </div>
                <div className="border p-4 rounded">
                  <h4 className="font-semibold">Appointment Letter</h4>
                  {staff.verification?.appointment_file
                    ? downloadBtn("Appointment", staff.verification.appointment_file, "verification")
                    : <p className="text-sm text-gray-500 mt-2">Not uploaded</p>}
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
