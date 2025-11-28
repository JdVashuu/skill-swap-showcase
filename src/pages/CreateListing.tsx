import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const skillOptions = [
  "Web Development", "Graphic Design", "Writing", "Photography", "Music",
  "Cooking", "Language Tutoring", "Fitness Training", "Carpentry", "Gardening",
  "Video Editing", "Marketing", "Accounting", "Legal Advice"
];

const CreateListing = () => {
  const [type, setType] = useState<"offer" | "want">("offer");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title && description && selectedTags.length > 0) {
      toast({
        title: "Listing created!",
        description: "Your listing has been published successfully.",
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
    <div className="min-h-screen pb-20 md:pt-20">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 card-shadow">
          <h1 className="text-3xl font-bold mb-2">Create Listing</h1>
          <p className="text-muted-foreground mb-8">Share what you can offer or what you're looking for</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div className="space-y-2">
              <Label>Listing Type *</Label>
              <Select value={type} onValueChange={(val) => setType(val as "offer" | "want")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offer">I'm Offering a Skill</SelectItem>
                  <SelectItem value="want">I'm Looking for a Skill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Web Development Tutoring"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your skill, experience, and what you can teach or what you want to learn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                required
              />
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label>Tags *</Label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map(skill => (
                  <Badge
                    key={skill}
                    variant={selectedTags.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleTag(skill)}
                  >
                    {skill}
                    {selectedTags.includes(skill) && <X className="ml-1 w-3 h-3" />}
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
              Publish Listing
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateListing;
