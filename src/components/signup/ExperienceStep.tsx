
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  initialData: any;
}

export const ExperienceStep = ({ onNext, onBack, canGoBack }: ExperienceStepProps) => {
  const [experience, setExperience] = useState([
    {
      role: "",
      organization: "",
      duration: "",
      description: "",
      experienceFile: null
    }
  ]);

  const addExperience = () => {
    setExperience([...experience, {
      role: "",
      organization: "",
      duration: "",
      description: "",
      experienceFile: null
    }]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ experience });
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
                  <Label>Job Role/Position *</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>
                <div>
                  <Label>Organization *</Label>
                  <Input
                    value={exp.organization}
                    onChange={(e) => updateExperience(index, 'organization', e.target.value)}
                    placeholder="Company/Organization name"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Duration *</Label>
                <Input
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                  placeholder="e.g., Jan 2020 - Dec 2022 or 3 years"
                  required
                />
              </div>

              <div>
                <Label>Job Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder="Brief description of your role and responsibilities"
                />
              </div>

              <div>
                <Label>Experience Certificate/Letter *</Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => updateExperience(index, 'experienceFile', e.target.files?.[0])}
                  required
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addExperience}>
          Add Another Experience
        </Button>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={!canGoBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};
