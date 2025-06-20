import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EducationStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  initialData: any;
}

export const EducationStep = ({
  onNext,
  onBack,
  canGoBack,
  initialData,
}: EducationStepProps) => {
  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      year: "",
      cgpa: "",
      degreeFile: null,
      marksheetFile: null,
      degree_file_url: "",
      marksheet_file_url: "",
    },
  ]);

  useEffect(() => {
    if (initialData?.education?.length) {
      const preloaded = initialData.education.map((edu: any) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        year: edu.year || "",
        cgpa: edu.cgpa || "",
        degreeFile: null,
        marksheetFile: null,
        degree_file_url: edu.degree_file
          ? `http://localhost:5000/uploads/education/${edu.degree_file}`
          : "",
        marksheet_file_url: edu.marksheet_file
          ? `http://localhost:5000/uploads/education/${edu.marksheet_file}`
          : "",
      }));
      setEducation(preloaded);
    }
  }, [initialData]);

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        institution: "",
        year: "",
        cgpa: "",
        degreeFile: null,
        marksheetFile: null,
        degree_file_url: "",
        marksheet_file_url: "",
      },
    ]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("staff_id", initialData.staff_id);

    const educationForBackend = education.map((edu) => ({
      degree: edu.degree,
      institution: edu.institution,
      year: edu.year,
      cgpa: edu.cgpa,
    }));

    formData.append("education", JSON.stringify(educationForBackend));

    education.forEach((edu, index) => {
      if (edu.degreeFile) {
        formData.append(`degreeFile${index}`, edu.degreeFile);
      } else if (edu.degree_file_url) {
        const filename = edu.degree_file_url.split("/").pop();
        formData.append(`existing_degree_file${index}`, filename || "");
      }

      if (edu.marksheetFile) {
        formData.append(`marksheetFile${index}`, edu.marksheetFile);
      } else if (edu.marksheet_file_url) {
        const filename = edu.marksheet_file_url.split("/").pop();
        formData.append(`existing_marksheet_file${index}`, filename || "");
      }
    });

    try {
      const res = await fetch("http://localhost:5000/api/staff/education", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Education saved successfully!");
        onNext(result);
      } else {
        alert(`❌ Error: ${result.error || "Server error"}`);
      }
    } catch (err: any) {
      alert("❌ Network error: " + err.message);
    }
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
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateEducation(index, "year", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateEducation(index, "cgpa", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree Certificate *</Label>
                  {edu.degree_file_url && (
                    <p className="text-xs text-green-700 mb-1">
                      File already uploaded:{" "}
                      <a
                        href={edu.degree_file_url}
                        target="_blank"
                        className="underline"
                      >
                        View File
                      </a>
                    </p>
                  )}
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      updateEducation(index, "degreeFile", e.target.files?.[0])
                    }
                    required={!edu.degree_file_url}
                  />
                </div>

                <div>
                  <Label>Marks Card *</Label>
                  {edu.marksheet_file_url && (
                    <p className="text-xs text-green-700 mb-1">
                      File already uploaded:{" "}
                      <a
                        href={edu.marksheet_file_url}
                        target="_blank"
                        className="underline"
                      >
                        View File
                      </a>
                    </p>
                  )}
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      updateEducation(index, "marksheetFile", e.target.files?.[0])
                    }
                    required={!edu.marksheet_file_url}
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
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={!canGoBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="bg-[#1E2A38] text-white hover:bg-[#1E2A38]/90"
        >
          Next
        </Button>
      </div>
    </form>
  );
};
