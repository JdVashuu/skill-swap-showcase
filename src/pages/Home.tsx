import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

// Dummy data
const dummyListings = [
  {
    id: "1",
    userName: "Sarah Chen",
    userInitials: "SC",
    skillTitle: "Web Development Tutoring",
    tags: ["React", "JavaScript", "CSS"],
    location: "San Francisco, CA",
    type: "offer" as const,
  },
  {
    id: "2",
    userName: "Mike Rodriguez",
    userInitials: "MR",
    skillTitle: "Photography Sessions",
    tags: ["Portrait", "Events", "Editing"],
    location: "Los Angeles, CA",
    type: "offer" as const,
  },
  {
    id: "3",
    userName: "Emily Watson",
    userInitials: "EW",
    skillTitle: "Looking for Yoga Instructor",
    tags: ["Fitness", "Wellness", "Beginner"],
    location: "Austin, TX",
    type: "want" as const,
  },
  {
    id: "4",
    userName: "David Kim",
    userInitials: "DK",
    skillTitle: "Graphic Design Services",
    tags: ["Logo", "Branding", "Illustrator"],
    location: "Seattle, WA",
    type: "offer" as const,
  },
  {
    id: "5",
    userName: "Lisa Martinez",
    userInitials: "LM",
    skillTitle: "Spanish Language Exchange",
    tags: ["Language", "Conversation", "Culture"],
    location: "Miami, FL",
    type: "offer" as const,
  },
  {
    id: "6",
    userName: "James Thompson",
    userInitials: "JT",
    skillTitle: "Need Help with Carpentry",
    tags: ["Woodworking", "DIY", "Furniture"],
    location: "Portland, OR",
    type: "want" as const,
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Skills</h1>
          <p className="text-muted-foreground">Find people to swap skills with in your area</p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
