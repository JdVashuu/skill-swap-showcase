import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ProficiencyLevel } from "@/types/listing";

interface ListingCardProps {
  id: string;
  userName: string;
  userInitials: string;
  skillTitle: string;
  tags: string[];
  location: string;
  type: "offer" | "want";
  proficiency: ProficiencyLevel;
}

const proficiencyConfig: Record<ProficiencyLevel, { label: string; className: string }> = {
  beginner: { label: "Beginner", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  intermediate: { label: "Intermediate", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  advanced: { label: "Advanced", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  expert: { label: "Expert", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
};

export const ListingCard = ({
  id,
  userName,
  userInitials,
  skillTitle,
  tags,
  location,
  type,
  proficiency,
}: ListingCardProps) => {
  const { label, className } = proficiencyConfig[proficiency];

  return (
    <Card className="p-6 card-shadow hover:card-shadow-hover transition-all hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 truncate">{skillTitle}</h3>
          <p className="text-sm text-muted-foreground">{userName}</p>
        </div>
        <Badge variant={type === "offer" ? "default" : "secondary"}>
          {type === "offer" ? "Offering" : "Seeking"}
        </Badge>
      </div>

      {/* Proficiency Level */}
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-muted-foreground" />
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${className}`}>
          {label}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <Button asChild size="sm">
          <Link to={`/listing/${id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
};
