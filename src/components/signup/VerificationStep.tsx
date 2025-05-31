
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VerificationStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  initialData: any;
}

export const VerificationStep = ({ onNext, onBack, canGoBack, isLastStep }: VerificationStepProps) => {
  const [verification, setVerification] = useState({
    aadhaarFile: null,
    appointmentFile: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ verification });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Verification Documents</h3>
        <p className="text-gray-600 mb-6">Please upload the required verification documents to complete your registration.</p>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Identity Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Aadhaar Card Copy *</Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setVerification({ ...verification, aadhaarFile: e.target.files?.[0] || null })}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload a clear copy of your Aadhaar card (both sides if applicable)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Employment Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Appointment Letter *</Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setVerification({ ...verification, appointmentFile: e.target.files?.[0] || null })}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload your official appointment letter from BMS Institute of Technology
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

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
        <Button type="button" variant="outline" onClick={onBack} disabled={!canGoBack}>
          Back
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          {isLastStep ? "Complete Registration" : "Next"}
        </Button>
      </div>
    </form>
  );
};
