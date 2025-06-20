import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExperienceStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  initialData: { staff_id: string; experience?: any[] };
}

export const ExperienceStep = ({
  onNext,
  onBack,
  canGoBack,
  initialData,
}: ExperienceStepProps) => {
  const [experience, setExperience] = useState([
    {
      role: "",
      organization: "",
      duration: "",
      description: "",
      experienceFile: null,
      experience_file: "",        // ✅ filename for backend
      experience_file_url: "",    // ✅ preview link for UI
    },
  ]);

  useEffect(() => {
    if (initialData?.experience?.length) {
      const preloaded = initialData.experience.map((exp: any) => ({
        role: exp.role || "",
        organization: exp.organization || "",
        duration: exp.duration || "",
        description: exp.description || "",
        experienceFile: null,
        experience_file: exp.experience_file || "",
        experience_file_url: exp.experience_file
          ? `http://localhost:5000/uploads/experience/${exp.experience_file}`
          : "",
      }));
      setExperience(preloaded);
    }
  }, [initialData]);

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        role: "",
        organization: "",
        duration: "",
        description: "",
        experienceFile: null,
        experience_file: "",
        experience_file_url: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperience(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("staff_id", initialData.staff_id);

    const experienceForBackend = experience.map((exp) => ({
      role: exp.role,
      organization: exp.organization,
      duration: exp.duration,
      description: exp.description,
      experience_file: exp.experience_file, // ✅ keep existing file if no new upload
    }));

    formData.append("experience", JSON.stringify(experienceForBackend));

    experience.forEach((exp, index) => {
      if (exp.experienceFile) {
        formData.append(`experienceFile${index}`, exp.experienceFile);
      }
    });

    try {
      const res = await fetch("http://localhost:5000/api/staff/experience", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Experience uploaded successfully!");
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
        <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
        {experience.map((exp, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex justify-between items-center">
                Experience {index + 1}
                {experience.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExperience(index)}
                  >
                    Remove
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Job Role *</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) =>
                      updateExperience(index, "role", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Organization *</Label>
                  <Input
                    value={exp.organization}
                    onChange={(e) =>
                      updateExperience(index, "organization", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Duration *</Label>
                <Input
                  value={exp.duration}
                  onChange={(e) =>
                    updateExperience(index, "duration", e.target.value)
                  }
                  placeholder="e.g., 2019 - 2023"
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  placeholder="Optional description of your role or responsibilities"
                />
              </div>

              <div>
                <Label>Experience Certificate *</Label>
                {exp.experience_file_url && (
                  <p className="text-xs text-green-700 mb-1">
                    File already uploaded:{" "}
                    <a
                      href={exp.experience_file_url}
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
                    updateExperience(
                      index,
                      "experienceFile",
                      e.target.files?.[0]
                    )
                  }
                  required={!exp.experience_file_url}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addExperience}>
          Add Another Experience
        </Button>
      </div>

      <div className="flex justify-between mt-6">
        <Button type="button" onClick={onBack} variant="outline" disabled={!canGoBack}>
          Back
        </Button>
        <Button type="submit" className="bg-[#1E2A38] text-white hover:bg-[#1E2A38]/90">
          Next
        </Button>
      </div>
    </form>
  );
};
