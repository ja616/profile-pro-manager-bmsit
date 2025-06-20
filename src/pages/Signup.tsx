import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BasicInfoStep } from "@/components/signup/BasicInfoStep";
import { EducationStep } from "@/components/signup/EducationStep";
import { ExperienceStep } from "@/components/signup/ExperienceStep";
import { CoursesStep } from "@/components/signup/CoursesStep";
import { AchievementsStep } from "@/components/signup/AchievementsStep";
import { VerificationStep } from "@/components/signup/VerificationStep";
import { toast } from "@/hooks/use-toast";

const steps = [
  { title: "Basic Info", component: BasicInfoStep },
  { title: "Education", component: EducationStep },
  { title: "Experience", component: ExperienceStep },
  { title: "Courses", component: CoursesStep },
  { title: "Achievements", component: AchievementsStep },
  { title: "Verification", component: VerificationStep },
];

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Normalize staff_id → id
  const initialRaw = location.state?.initialData || {};
  const initialData = {
    ...initialRaw,
    id: initialRaw.staff_id ?? initialRaw.id,
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const handleNext = (stepData: any) => {
    const mergedData = { ...formData, ...stepData };

    // ✅ Keep id during step navigation
    if (formData.id) {
      mergedData.id = formData.id;
    }

    setFormData(mergedData);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(mergedData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (finalData: any) => {
    console.log("Submitting final form data:", finalData);
    toast({
      title: "✅ Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    navigate("/dashboard");
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-slate-800">
                {initialData?.id ? "Edit Profile" : "Staff Registration"}
              </CardTitle>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{steps[currentStep].title}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <CurrentStepComponent
                onNext={handleNext}
                onBack={handleBack}
                canGoBack={currentStep > 0}
                isLastStep={currentStep === steps.length - 1}
                initialData={formData}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;

