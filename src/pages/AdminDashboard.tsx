
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Search, FileText, Trash2, Clock } from "lucide-react";

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

  const handleDelete = (staffId: number) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      console.log("Deleting staff member:", staffId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6F8] to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E2A38] mb-2">Admin Dashboard</h1>
          <p className="text-[#4A4A4A]">Manage all staff profiles and documentation</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-[#00B8A9]/20">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#1E2A38]">{mockStaff.length}</div>
              <p className="text-[#4A4A4A]">Total Staff</p>
            </CardContent>
          </Card>
          <Card className="border-[#00B8A9]/20">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#00B8A9]">4</div>
              <p className="text-[#4A4A4A]">Verified Profiles</p>
            </CardContent>
          </Card>
          <Card className="border-[#00B8A9]/20">
            <CardContent className="p-6 cursor-pointer hover:bg-[#F4F6F8]/50">
              <Link to="/pending-reviews" className="block">
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <p className="text-[#4A4A4A] flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Pending Reviews
                </p>
              </Link>
            </CardContent>
          </Card>
          <Card className="border-[#00B8A9]/20">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <p className="text-[#4A4A4A]">Departments</p>
            </CardContent>
          </Card>
        </div>

        {/* Staff Table */}
        <Card className="border-[#00B8A9]/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#1E2A38]">Staff Directory</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] w-4 h-4" />
                <Input
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 border-[#00B8A9]/20"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[#00B8A9]/20">
                  <TableHead className="text-[#1E2A38]">Name</TableHead>
                  <TableHead className="text-[#1E2A38]">Department</TableHead>
                  <TableHead className="text-[#1E2A38]">Designation</TableHead>
                  <TableHead className="text-[#1E2A38]">Join Date</TableHead>
                  <TableHead className="text-[#1E2A38]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id} className="border-[#00B8A9]/10 hover:bg-[#F4F6F8]/50">
                    <TableCell className="font-medium text-[#1E2A38]">{staff.name}</TableCell>
                    <TableCell className="text-[#4A4A4A]">{staff.department}</TableCell>
                    <TableCell className="text-[#4A4A4A]">{staff.designation}</TableCell>
                    <TableCell className="text-[#4A4A4A]">{staff.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/staff-details/${staff.id}`}>
                          <Button variant="outline" size="sm" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                            <FileText className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(staff.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
