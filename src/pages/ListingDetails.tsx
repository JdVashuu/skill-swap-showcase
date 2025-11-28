import { Navbar } from "@/components/Navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Star, MessageCircle, Handshake } from "lucide-react";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
  const { id } = useParams();

  // Dummy data - in real app would fetch by id
  const listing = {
    userName: "Sarah Chen",
    userInitials: "SC",
    rating: 4.8,
    reviewCount: 12,
    skillTitle: "Web Development Tutoring",
    description: "I'm a senior full-stack developer with 8 years of experience. I can help you learn React, JavaScript, TypeScript, and modern web development practices. Whether you're a beginner or looking to level up your skills, I'm here to help! I prefer hands-on project-based learning and can adapt to your pace.",
    tags: ["React", "JavaScript", "CSS", "TypeScript"],
    location: "San Francisco, CA",
    availability: "Weekday evenings",
    type: "offer" as const,
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 card-shadow">
          {/* Header */}
          <div className="flex items-start gap-6 mb-6 pb-6 border-b">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
                {listing.userInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{listing.skillTitle}</h1>
                  <p className="text-muted-foreground">{listing.userName}</p>
                </div>
                <Badge variant={listing.type === "offer" ? "default" : "secondary"}>
                  {listing.type === "offer" ? "Offering" : "Seeking"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold">{listing.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({listing.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{listing.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className="font-medium">{listing.availability}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1">
              <Handshake className="w-5 h-5 mr-2" />
              Propose Swap
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <MessageCircle className="w-5 h-5 mr-2" />
              Message User
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ListingDetails;
