import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CoursesStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  initialData: { staff_id: string; courses?: any[] };
}

export const CoursesStep = ({
  onNext,
  onBack,
  canGoBack,
  initialData,
}: CoursesStepProps) => {
  const [courses, setCourses] = useState([
    {
      name: "",
      platform: "",
      year: "",
      courseFile: null,
      course_file: "",
      course_file_url: "",
    },
  ]);

  useEffect(() => {
    if (initialData?.courses?.length) {
      const preloaded = initialData.courses.map((c) => ({
        name: c.name || "",
        platform: c.platform || "",
        year: c.year || "",
        courseFile: null,
        course_file: c.course_file || "",
        course_file_url: c.course_file
          ? `http://localhost:5000/uploads/courses/${c.course_file}`
          : "",
      }));
      setCourses(preloaded);
    }
  }, [initialData]);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        name: "",
        platform: "",
        year: "",
        courseFile: null,
        course_file: "",
        course_file_url: "",
      },
    ]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("staff_id", initialData.staff_id);

    const courseDetails = courses.map(({ courseFile, course_file_url, ...rest }) => rest);
    formData.append("courses", JSON.stringify(courseDetails));

    courses.forEach((course, idx) => {
      if (course.courseFile) {
        formData.append(`courseFile${idx}`, course.courseFile);
      } else if (course.course_file) {
        formData.append(`existing_course_file${idx}`, course.course_file); // ✅ Preserve old file
      }
    });

    try {
      const res = await fetch("http://localhost:5000/api/staff/courses", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Courses saved successfully!");
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
        <h3 className="text-lg font-semibold mb-4">Courses & Certifications</h3>
        {courses.map((course, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex justify-between items-center">
                Course {index + 1}
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
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Course Name *</Label>
                  <Input
                    value={course.name}
                    onChange={(e) => updateCourse(index, "name", e.target.value)}
                    placeholder="e.g., Python for Data Science"
                    required
                  />
                </div>
                <div>
                  <Label>Platform/Institute *</Label>
                  <Input
                    value={course.platform}
                    onChange={(e) => updateCourse(index, "platform", e.target.value)}
                    placeholder="e.g., Coursera, Udemy"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Year of Completion *</Label>
                <Input
                  type="number"
                  min="2000"
                  max="2030"
                  value={course.year}
                  onChange={(e) => updateCourse(index, "year", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Course Certificate *</Label>
                {course.course_file_url && (
                  <p className="text-xs text-green-700 mb-1">
                    File already uploaded:{" "}
                    <a
                      href={course.course_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
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
                    updateCourse(index, "courseFile", e.target.files?.[0] || null)
                  }
                  required={!course.course_file_url}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addCourse}>
          Add Another Course
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
