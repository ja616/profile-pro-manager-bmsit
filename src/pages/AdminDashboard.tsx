import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Search, FileText, Trash2, Clock } from "lucide-react";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [staffList, setStaffList] = useState<any[]>([]);

  // Fetch staff list
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/staffs");
        const data = await res.json();
        setStaffList(data);
      } catch (error) {
        console.error("Failed to fetch staff list:", error);
      }
    };
    fetchStaff();
  }, []);

  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (staffId: number) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/staff/${staffId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStaffList(prev => prev.filter((s) => s.id !== staffId));
        alert("✅ Staff deleted.");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete staff.");
      }
    } catch (err) {
      console.error("Error deleting staff:", err);
    }
  };

  const handleVerify = async (staffId: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/staff/${staffId}/verify`, {
        method: "PATCH",
      });
      if (res.ok) {
        setStaffList(prev =>
          prev.map(s => s.id === staffId ? { ...s, is_verified: true } : s)
        );
        alert("✅ Staff verified.");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to verify staff.");
      }
    } catch (err) {
      console.error("Error verifying staff:", err);
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

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#1E2A38]">{staffList.length}</div>
              <p className="text-[#4A4A4A]">Total Staff</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#00B8A9]">
                {staffList.filter(s => s.is_verified).length}
              </div>
              <p className="text-[#4A4A4A]">Verified Profiles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 cursor-pointer hover:bg-[#F4F6F8]/50">
              <Link to="/pending-reviews">
                <div className="text-2xl font-bold text-yellow-600">
                  {staffList.filter(s => !s.is_verified).length}
                </div>
                <p className="text-[#4A4A4A] flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Pending Reviews
                </p>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(staffList.map((s) => s.department)).size}
              </div>
              <p className="text-[#4A4A4A]">Departments</p>
            </CardContent>
          </Card>
        </div>

        {/* Staff Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#1E2A38]">Staff Directory</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] w-4 h-4" />
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
                  <TableRow
                    key={staff.id}
                    className={`hover:bg-[#F4F6F8]/50 ${
                      !staff.is_verified ? "bg-yellow-50" : ""
                    }`}
                  >
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>{staff.designation}</TableCell>
                    <TableCell>{staff.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/staff-details/${staff.id}`}>
                          <Button variant="outline" size="sm" className="text-[#00B8A9] border-[#00B8A9] hover:bg-[#00B8A9]/10">
                            <FileText className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        {!staff.is_verified && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-600 text-green-700 hover:bg-green-50"
                            onClick={() => handleVerify(staff.id)}
                          >
                            ✅ Verify
                          </Button>
                        )}
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
