import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User } from "lucide-react";

interface BasicInfoStepProps {
  onNext: (resp: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  initialData?: any;
}

export const BasicInfoStep = ({
  onNext,
  onBack,
  canGoBack,
  initialData,
}: BasicInfoStepProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
    designation: "",
    joinDate: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData((old) => ({
        ...old,
        ...initialData,
        profilePicture: null,
        password: "",
        confirmPassword: "",
      }));

      if (initialData.profile_picture) {
        setPreviewUrl(`http://localhost:5000/uploads/profile_pictures/${initialData.profile_picture}`);
      }
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [field]: e.target.value });

  const handleSelect = (field: string) => (value: string) =>
    setFormData({ ...formData, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEdit = !!initialData?.id;

    if (!isEdit && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const body = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "profilePicture") return;
      if (isEdit && (k === "password" || k === "confirmPassword")) return;
      body.append(k, v as string);
    });
    if (formData.profilePicture) {
      body.append("profilePicture", formData.profilePicture);
    }

    const url = isEdit
      ? `http://localhost:5000/api/staff/update-staff/${initialData.id}`
      : "http://localhost:5000/api/staff/submit-basic-info";

    try {
      const res = await fetch(url, {
        method: "POST", // ✅ Unified as POST for both new/edit
        body,
      });

      const result = await res.json();
      if (res.ok) {
        alert(isEdit ? "✅ Profile updated!" : "✅ Registration successful!");
        onNext({ staff_id: result.staff_id || initialData.id }); // send id forward
      } else {
        alert(`❌ ${result.error || "Server error"}`);
      }
    } catch (err: any) {
      alert("❌ Network error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <User className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Upload Photo</p>
            </div>
          )}
        </div>
        <Label htmlFor="profilePicture" className="cursor-pointer">
          <div className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
            <Upload className="w-4 h-4 mr-1" />
            Upload Profile Picture
          </div>
        </Label>
        <Input id="profilePicture" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" value={formData.name} onChange={handleChange("name")} required />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={formData.email} onChange={handleChange("email")} required />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" value={formData.phone} onChange={handleChange("phone")} required />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input id="dob" type="date" value={formData.dob} onChange={handleChange("dob")} required />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Department *</Label>
          <Select value={formData.department} onValueChange={handleSelect("department")}>
            <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
            <SelectContent>
              {["cse", "ece", "ise", "aiml", "me", "civil"].map(d => (
                <SelectItem key={d} value={d}>{d.toUpperCase()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Designation *</Label>
          <Select value={formData.designation} onValueChange={handleSelect("designation")}>
            <SelectTrigger><SelectValue placeholder="Select Designation" /></SelectTrigger>
            <SelectContent>
              {[
                "professor", "associate-professor", "assistant-professor", "lecturer",
                "technical-assistant", "lab-technician", "senior-technician",
                "technical-supervisor", "system-administrator"
              ].map(d => (
                <SelectItem key={d} value={d}>{d.replace(/-/g, " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="joinDate">Join Date *</Label>
        <Input id="joinDate" type="date" value={formData.joinDate} onChange={handleChange("joinDate")} required />
      </div>
      <div>
        <Label htmlFor="address">Address *</Label>
        <Textarea id="address" value={formData.address} onChange={handleChange("address")} required />
      </div>

      {!initialData?.id && (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input id="password" type="password" value={formData.password} onChange={handleChange("password")} required />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange("confirmPassword")} required />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={!canGoBack}>
          Back
        </Button>
        <Button type="submit" className="bg-slate-800 text-white hover:bg-slate-900">
          {initialData?.id ? "Update" : "Next"}
        </Button>
      </div>
    </form>
  );
};
