
import { useState } from "react";
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
  initialData: any;
}

export const AchievementsStep = ({ onNext, onBack, canGoBack }: AchievementsStepProps) => {
  const [achievements, setAchievements] = useState([
    {
      title: "",
      description: "",
      year: "",
      achievementFile: null
    }
  ]);

  const addAchievement = () => {
    setAchievements([...achievements, {
      title: "",
      description: "",
      year: "",
      achievementFile: null
    }]);
  };

  const removeAchievement = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const updateAchievement = (index: number, field: string, value: any) => {
    const updated = achievements.map((achievement, i) => 
      i === index ? { ...achievement, [field]: value } : achievement
    );
    setAchievements(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ achievements });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Achievements & Awards</h3>
        <p className="text-gray-600 mb-4">Add any awards, recognitions, or notable achievements in your professional career.</p>
        
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
                <Label>Achievement Title *</Label>
                <Input
                  value={achievement.title}
                  onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                  placeholder="e.g., Best Faculty Award, Research Excellence Award"
                  required
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                  placeholder="Brief description of the achievement"
                  required
                />
              </div>

              <div>
                <Label>Year *</Label>
                <Input
                  value={achievement.year}
                  onChange={(e) => updateAchievement(index, 'year', e.target.value)}
                  placeholder="e.g., 2023"
                  required
                />
              </div>

              <div>
                <Label>Certificate/Proof (Optional)</Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => updateAchievement(index, 'achievementFile', e.target.files?.[0])}
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
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};
