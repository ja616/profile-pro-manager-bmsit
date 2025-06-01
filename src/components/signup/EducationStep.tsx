
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EducationStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  initialData: any;
}

export const EducationStep = ({ onNext, onBack, canGoBack }: EducationStepProps) => {
  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      year: "",
      cgpa: "",
      degreeFile: null,
      marksheetFile: null
    }
  ]);

  const addEducation = () => {
    setEducation([...education, {
      degree: "",
      institution: "",
      year: "",
      cgpa: "",
      degreeFile: null,
      marksheetFile: null
    }]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ education });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Education Details</h3>
        {education.map((edu, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex justify-between items-center">
                Education {index + 1}
                {education.length > 1 && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeEducation(index)}
                  >
                    Remove
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree/Qualification *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder="e.g., B.Tech, M.Tech, Ph.D"
                    required
                  />
                </div>
                <div>
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    placeholder="University/College name"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Year of Completion *</Label>
                  <Input
                    type="number"
                    min="1950"
                    max="2030"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    placeholder="e.g., 2020"
                    required
                  />
                </div>
                <div>
                  <Label>CGPA/Percentage *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={edu.cgpa}
                    onChange={(e) => updateEducation(index, 'cgpa', e.target.value)}
                    placeholder="e.g., 8.5"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree Certificate *</Label>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => updateEducation(index, 'degreeFile', e.target.files?.[0])}
                    required
                  />
                </div>
                <div>
                  <Label>Marks Card *</Label>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => updateEducation(index, 'marksheetFile', e.target.files?.[0])}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addEducation}>
          Add Another Education
        </Button>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={!canGoBack}>
          Back
        </Button>
        <Button type="submit" className="bg-[#1E2A38] text-white hover:bg-[#1E2A38]/90">Next</Button>
      </div>
    </form>
  );
};
