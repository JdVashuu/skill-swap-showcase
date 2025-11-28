import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface ListingCardProps {
  id: string;
  userName: string;
  userInitials: string;
  skillTitle: string;
  tags: string[];
  location: string;
  type: "offer" | "want";
}

export const ListingCard = ({
  id,
  userName,
  userInitials,
  skillTitle,
  tags,
  location,
  type,
}: ListingCardProps) => {
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
