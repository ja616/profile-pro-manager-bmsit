
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CoursesStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  initialData: any;
}

export const CoursesStep = ({ onNext, onBack, canGoBack }: CoursesStepProps) => {
  const [courses, setCourses] = useState([
    {
      name: "",
      platform: "",
      year: "",
      courseFile: null
    }
  ]);

  const addCourse = () => {
    setCourses([...courses, {
      name: "",
      platform: "",
      year: "",
      courseFile: null
    }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: string, value: any) => {
    const updated = courses.map((course, i) => 
      i === index ? { ...course, [field]: value } : course
    );
    setCourses(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ courses });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Courses & Certifications</h3>
        <p className="text-gray-600 mb-4">Add any professional courses, certifications, or training programs you've completed.</p>
        
        {courses.map((course, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex justify-between items-center">
                Course/Certification {index + 1}
                {courses.length > 1 && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeCourse(index)}
                  >
                    Remove
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Course/Certification Name *</Label>
                <Input
                  value={course.name}
                  onChange={(e) => updateCourse(index, 'name', e.target.value)}
                  placeholder="e.g., Machine Learning Specialization"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Platform/Institution *</Label>
                  <Input
                    value={course.platform}
                    onChange={(e) => updateCourse(index, 'platform', e.target.value)}
                    placeholder="e.g., Coursera, Udemy, IIT Bombay"
                    required
                  />
                </div>
                <div>
                  <Label>Completion Year *</Label>
                  <Input
                    value={course.year}
                    onChange={(e) => updateCourse(index, 'year', e.target.value)}
                    placeholder="e.g., 2023"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Certificate *</Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => updateCourse(index, 'courseFile', e.target.files?.[0])}
                  required
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addCourse}>
          Add Another Course
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
