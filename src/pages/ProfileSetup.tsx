import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const skillOptions = [
  "Web Development", "Graphic Design", "Writing", "Photography", "Music",
  "Cooking", "Language Tutoring", "Fitness Training", "Carpentry", "Gardening",
  "Video Editing", "Marketing", "Accounting", "Legal Advice"
];

const ProfileSetup = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState("");
  const [offeredSkills, setOfferedSkills] = useState<string[]>([]);
  const [wantedSkills, setWantedSkills] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleSkill = (skill: string, type: 'offered' | 'wanted') => {
    if (type === 'offered') {
      setOfferedSkills(prev => 
        prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
      );
    } else {
      setWantedSkills(prev => 
        prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && city && offeredSkills.length > 0) {
      toast({
        title: "Profile saved!",
        description: "Your profile has been created successfully.",
      });
      navigate("/home");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 card-shadow">
          <h1 className="text-3xl font-bold mb-2">Set Up Your Profile</h1>
          <p className="text-muted-foreground mb-8">Tell us about yourself and your skills</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Click to upload photo</p>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="e.g., San Francisco, CA"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell others about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            {/* Skills Offered */}
            <div className="space-y-3">
              <Label>Skills I Can Offer *</Label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map(skill => (
                  <Badge
                    key={skill}
                    variant={offeredSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleSkill(skill, 'offered')}
                  >
                    {skill}
                    {offeredSkills.includes(skill) && <X className="ml-1 w-3 h-3" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="space-y-3">
              <Label>Skills I Want to Learn</Label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map(skill => (
                  <Badge
                    key={skill}
                    variant={wantedSkills.includes(skill) ? "secondary" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleSkill(skill, 'wanted')}
                  >
                    {skill}
                    {wantedSkills.includes(skill) && <X className="ml-1 w-3 h-3" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="evenings">Evenings</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Save Profile
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
