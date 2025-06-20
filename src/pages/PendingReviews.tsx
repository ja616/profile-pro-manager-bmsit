import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, FileText } from "lucide-react";

const PendingReviews = () => {
  const [pendingStaff, setPendingStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/staffs");
        const data = await res.json();
        const unverified = data.filter((s: any) => !s.is_verified);
        setPendingStaff(unverified);
      } catch (err) {
        console.error("Failed to fetch pending staff:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const handleApprove = async (staffId: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/staff/${staffId}/verify`, {
        method: "PATCH",
      });
      if (res.ok) {
        setPendingStaff(prev => prev.filter(s => s.id !== staffId));
        alert("✅ Staff approved successfully.");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to approve staff.");
      }
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const handleReject = async (staffId: number) => {
    if (!confirm("Are you sure you want to reject (delete) this staff profile?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/staff/${staffId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPendingStaff(prev => prev.filter(s => s.id !== staffId));
        alert("❌ Staff profile rejected and deleted.");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete staff.");
      }
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6F8] to-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/admin-dashboard"
            className="inline-flex items-center text-[#00B8A9] hover:text-[#1E2A38] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-[#1E2A38] mb-2">Pending Reviews</h1>
          <p className="text-[#4A4A4A]">Review and approve or reject unverified staff profiles</p>
        </div>

        <Card className="border-[#00B8A9]/20">
          <CardHeader>
            <CardTitle className="text-[#1E2A38]">Unverified Staff</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-slate-500">Loading...</p>
            ) : pendingStaff.length === 0 ? (
              <p className="text-slate-500">No pending staff applications.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingStaff.map((staff) => (
                    <TableRow
                      key={staff.id}
                      className="hover:bg-[#F4F6F8]/50 bg-yellow-50"
                    >
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.designation}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          Pending Verification
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link to={`/staff-details/${staff.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10"
                            >
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
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default PendingReviews;
