import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VerificationStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  initialData: {
    staff_id: string;
    verification?: {
      aadhaar_file?: string;
      appointment_file?: string;
    };
  };
}

export const VerificationStep = ({
  onNext,
  onBack,
  canGoBack,
  isLastStep,
  initialData,
}: VerificationStepProps) => {
  const [verification, setVerification] = useState({
    aadhaarFile: null as File | null,
    appointmentFile: null as File | null,
    aadhaar_file_url: "",
    appointment_file_url: "",
    aadhaar_file: "",
    appointment_file: "",
  });

  useEffect(() => {
    if (initialData?.verification) {
      setVerification((prev) => ({
        ...prev,
        aadhaar_file: initialData.verification.aadhaar_file || "",
        appointment_file: initialData.verification.appointment_file || "",
        aadhaar_file_url: initialData.verification.aadhaar_file
          ? `http://localhost:5000/uploads/verification/${initialData.verification.aadhaar_file}`
          : "",
        appointment_file_url: initialData.verification.appointment_file
          ? `http://localhost:5000/uploads/verification/${initialData.verification.appointment_file}`
          : "",
      }));
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verification.aadhaarFile && !verification.aadhaar_file_url) {
      alert("Please upload Aadhaar Card");
      return;
    }

    if (!verification.appointmentFile && !verification.appointment_file_url) {
      alert("Please upload Appointment Letter");
      return;
    }

    const formData = new FormData();
    formData.append("staff_id", initialData.staff_id);

    // New files if selected
    if (verification.aadhaarFile) {
      formData.append("aadhaarFile", verification.aadhaarFile);
    } else if (verification.aadhaar_file) {
      formData.append("existing_aadhaar_file", verification.aadhaar_file); // ✅ preserve existing
    }

    if (verification.appointmentFile) {
      formData.append("appointmentFile", verification.appointmentFile);
    } else if (verification.appointment_file) {
      formData.append("existing_appointment_file", verification.appointment_file); // ✅ preserve existing
    }

    try {
      const res = await fetch("http://localhost:5000/api/staff/verification", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Verification documents submitted successfully!");
        onNext(data);
      } else {
        alert(`❌ Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err: any) {
      alert("❌ Network error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Verification Documents</h3>
        <p className="text-gray-600 mb-6">
          Please upload the required verification documents to complete your profile.
        </p>

        {/* Aadhaar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Identity Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Aadhaar Card *</Label>
              {verification.aadhaar_file_url && (
                <p className="text-sm text-green-700 mb-1">
                  File already uploaded:{" "}
                  <a
                    href={verification.aadhaar_file_url}
                    target="_blank"
                    className="underline"
                  >
                    View Aadhaar
                  </a>
                </p>
              )}
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  setVerification({
                    ...verification,
                    aadhaarFile: e.target.files?.[0] || null,
                  })
                }
                required={!verification.aadhaar_file_url}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointment Letter */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Employment Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Appointment Letter *</Label>
              {verification.appointment_file_url && (
                <p className="text-sm text-green-700 mb-1">
                  File already uploaded:{" "}
                  <a
                    href={verification.appointment_file_url}
                    target="_blank"
                    className="underline"
                  >
                    View Appointment Letter
                  </a>
                </p>
              )}
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  setVerification({
                    ...verification,
                    appointmentFile: e.target.files?.[0] || null,
                  })
                }
                required={!verification.appointment_file_url}
              />
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-blue-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• All documents should be clear and readable</li>
            <li>• Supported formats: PDF, JPG, JPEG, PNG</li>
            <li>• Maximum file size: 5MB per document</li>
            <li>• Your profile will be reviewed by admin before activation</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={!canGoBack}
        >
          Back
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          {isLastStep ? "Complete Profile" : "Next"}
        </Button>
      </div>
    </form>
  );
};
