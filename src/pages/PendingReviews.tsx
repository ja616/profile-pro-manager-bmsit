
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, FileText } from "lucide-react";

const PendingReviews = () => {
  const pendingStaff = [
    {
      id: 5,
      name: "Ms. Rashida Khan",
      department: "Artificial Intelligence & Machine Learning",
      designation: "Technical Assistant",
      joinDate: "Dec 2024",
      email: "rashida.khan@bmsit.in",
      status: "Pending Verification"
    },
    {
      id: 6,
      name: "Mr. Suresh Reddy",
      department: "Computer Science & Engineering",
      designation: "Lab Technician",
      joinDate: "Jan 2025",
      email: "suresh.reddy@bmsit.in",
      status: "Document Review"
    }
  ];

  const handleApprove = (staffId: number) => {
    console.log("Approving staff member:", staffId);
    alert("Staff member approved successfully!");
  };

  const handleReject = (staffId: number) => {
    if (confirm("Are you sure you want to reject this application?")) {
      console.log("Rejecting staff member:", staffId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6F8] to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/admin-dashboard" className="inline-flex items-center text-[#00B8A9] hover:text-[#1E2A38] mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-[#1E2A38] mb-2">Pending Reviews</h1>
          <p className="text-[#4A4A4A]">Review and approve staff applications</p>
        </div>

        {/* Pending Reviews Table */}
        <Card className="border-[#00B8A9]/20">
          <CardHeader>
            <CardTitle className="text-[#1E2A38]">Applications Awaiting Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[#00B8A9]/20">
                  <TableHead className="text-[#1E2A38]">Name</TableHead>
                  <TableHead className="text-[#1E2A38]">Department</TableHead>
                  <TableHead className="text-[#1E2A38]">Designation</TableHead>
                  <TableHead className="text-[#1E2A38]">Status</TableHead>
                  <TableHead className="text-[#1E2A38]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingStaff.map((staff) => (
                  <TableRow key={staff.id} className="border-[#00B8A9]/10 hover:bg-[#F4F6F8]/50">
                    <TableCell className="font-medium text-[#1E2A38]">{staff.name}</TableCell>
                    <TableCell className="text-[#4A4A4A]">{staff.department}</TableCell>
                    <TableCell className="text-[#4A4A4A]">{staff.designation}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        {staff.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/staff-details/${staff.id}`}>
                          <Button variant="outline" size="sm" className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10">
                            <FileText className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleApprove(staff.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleReject(staff.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
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

export default PendingReviews;
