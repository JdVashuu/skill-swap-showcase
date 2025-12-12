import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star, Edit, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 md:pt-20">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen pb-20 md:pt-20">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground">Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="text-center py-4 mb-4 text-destructive">
            Failed to load latest profile. Showing cached data.
          </div>
        )}

        <Card className="p-8 card-shadow">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8 pb-8 border-b">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-3xl">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {profile.memberSince}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile-setup">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-semibold text-lg">{profile.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({profile.reviewCount} reviews)
                  </span>
                </div>
                <div className="h-6 w-px bg-border hidden sm:block" />
                <div>
                  <span className="font-semibold text-lg">{profile.completedSwaps}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    completed swaps
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
          </div>

          {/* Skills Offered */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Skills I Offer</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skillsOffered.map((skill, index) => (
                <Badge key={index} variant="default" className="text-sm py-1.5 px-3">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <h2 className="text-xl font-bold mb-4">Skills I Want to Learn</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skillsWanted.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1.5 px-3">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
