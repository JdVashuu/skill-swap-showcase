import { Navbar } from "@/components/Navbar";
import { ListingCard } from "@/components/ListingCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { useState } from "react";
import { useListings } from "@/hooks/useListings";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { listings, isLoading, error } = useListings({ searchQuery });

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-2">Failed to load listings</p>
            <p className="text-sm text-muted-foreground">Showing cached results</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No listings found matching your search</p>
          </div>
        )}

        {/* Listings Grid */}
        {!isLoading && listings.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
