import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface AchievementsStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  initialData: {
    staff_id: string;
    achievements?: any[];
  };
}

export const AchievementsStep = ({
  onNext,
  onBack,
  canGoBack,
  initialData,
}: AchievementsStepProps) => {
  const [achievements, setAchievements] = useState([
    {
      title: "",
      description: "",
      year: "",
      achievementFile: null,
      achievement_file_url: "",
      achievement_file: "", // 🔁 Needed to send if file is not re-uploaded
    },
  ]);

  useEffect(() => {
    if (initialData?.achievements?.length) {
      const preloaded = initialData.achievements.map((a: any) => ({
        title: a.title || "",
        description: a.description || "",
        year: a.year || "",
        achievementFile: null,
        achievement_file: a.achievement_file || "",
        achievement_file_url: a.achievement_file
          ? `http://localhost:5000/uploads/achievements/${a.achievement_file}`
          : "",
      }));
      setAchievements(preloaded);
    }
  }, [initialData]);

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      {
        title: "",
        description: "",
        year: "",
        achievementFile: null,
        achievement_file: "",
        achievement_file_url: "",
      },
    ]);
  };

  const removeAchievement = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const updateAchievement = (index: number, field: string, value: any) => {
    const updated = achievements.map((a, i) =>
      i === index ? { ...a, [field]: value } : a
    );
    setAchievements(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("staff_id", initialData?.staff_id || "");

    const achievementsToSend = achievements.map(
      ({ achievementFile, achievement_file_url, ...rest }) => rest
    );
    formData.append("achievements", JSON.stringify(achievementsToSend));

    achievements.forEach((a, idx) => {
      if (a.achievementFile) {
        formData.append(`achievementFile${idx}`, a.achievementFile);
      } else if (a.achievement_file) {
        formData.append(`existing_achievement_file${idx}`, a.achievement_file); // ✅ Preserve
      }
    });

    try {
      const res = await fetch("http://localhost:5000/api/staff/achievements", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Achievements submitted successfully!");
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
        <h3 className="text-lg font-semibold mb-4">Achievements & Awards</h3>
        <p className="text-gray-600 mb-4">Add awards, recognitions, or achievements.</p>

        {achievements.map((achievement, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-base flex justify-between items-center">
                Achievement {index + 1}
                {achievements.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeAchievement(index)}
                  >
                    Remove
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={achievement.title}
                  onChange={(e) =>
                    updateAchievement(index, "title", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label>Description *</Label>
                <Textarea
                  value={achievement.description}
                  onChange={(e) =>
                    updateAchievement(index, "description", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label>Year *</Label>
                <Input
                  type="number"
                  min="1950"
                  max="2035"
                  value={achievement.year}
                  onChange={(e) =>
                    updateAchievement(index, "year", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label>Certificate/Proof (Optional)</Label>
                {achievement.achievement_file_url && (
                  <p className="text-sm text-green-700 mb-1">
                    File already uploaded:{" "}
                    <a
                      href={achievement.achievement_file_url}
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
                    updateAchievement(index, "achievementFile", e.target.files?.[0] || null)
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addAchievement}>
          Add Another Achievement
        </Button>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={!canGoBack}>
          Back
        </Button>
        <Button type="submit" className="bg-[#1E2A38] text-white hover:bg-[#1E2A38]/90">
          Next
        </Button>
      </div>
    </form>
  );
};
