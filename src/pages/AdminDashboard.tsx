
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Search, FileText } from "lucide-react";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockStaff = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      department: "Computer Science & Engineering",
      designation: "Associate Professor",
      joinDate: "Aug 2022",
      email: "priya.sharma@bmsit.in"
    },
    {
      id: 2,
      name: "Prof. Aman Rajesh",
      department: "Electronics & Communication",
      designation: "Assistant Professor",
      joinDate: "Jul 2021",
      email: "aman.rajesh@bmsit.in"
    },
    {
      id: 3,
      name: "Dr. Sneha Patel",
      department: "Information Science",
      designation: "Professor",
      joinDate: "Mar 2020",
      email: "sneha.patel@bmsit.in"
    },
    {
      id: 4,
      name: "Mr. Vikram Kumar",
      department: "Mechanical Engineering",
      designation: "Assistant Professor",
      joinDate: "Jan 2023",
      email: "vikram.kumar@bmsit.in"
    }
  ];

  const filteredStaff = mockStaff.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all staff profiles and documentation</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{mockStaff.length}</div>
              <p className="text-gray-600">Total Staff</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">4</div>
              <p className="text-gray-600">Verified Profiles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">0</div>
              <p className="text-gray-600">Pending Reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <p className="text-gray-600">Departments</p>
            </CardContent>
          </Card>
        </div>

        {/* Staff Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Staff Directory</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>{staff.designation}</TableCell>
                    <TableCell>{staff.joinDate}</TableCell>
                    <TableCell>
                      <Link to={`/staff-details/${staff.id}`}>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
