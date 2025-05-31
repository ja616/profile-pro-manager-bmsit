
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  initialData: any;
}

export const BasicInfoStep = ({ onNext, onBack, canGoBack }: BasicInfoStepProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joinDate: "",
    address: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Department *</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cse">Computer Science & Engineering</SelectItem>
              <SelectItem value="ece">Electronics & Communication</SelectItem>
              <SelectItem value="ise">Information Science & Engineering</SelectItem>
              <SelectItem value="me">Mechanical Engineering</SelectItem>
              <SelectItem value="civil">Civil Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="designation">Designation *</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, designation: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Designation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professor">Professor</SelectItem>
              <SelectItem value="associate-professor">Associate Professor</SelectItem>
              <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
              <SelectItem value="lecturer">Lecturer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="joinDate">Join Date *</Label>
          <Input
            id="joinDate"
            type="date"
            value={formData.joinDate}
            onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
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
