import { useState, useEffect, useMemo } from "react";
import { Listing } from "@/types/listing";
import { dummyListings } from "@/data/dummyListings";
import { api } from "@/lib/api";

interface UseListingsOptions {
  searchQuery?: string;
  filterType?: "all" | "offer" | "want";
}

interface UseListingsResult {
  listings: Listing[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useListings = (options: UseListingsOptions = {}): UseListingsResult => {
  const { searchQuery = "", filterType = "all" } = options;
  const [listings, setListings] = useState<Listing[]>(dummyListings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getListings(searchQuery);
      setListings(data.length > 0 ? data : dummyListings);
    } catch (err) {
      console.log("Using dummy data - Flask backend not available");
      setError(err instanceof Error ? err : new Error("Failed to fetch listings"));
      setListings(dummyListings);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, [searchQuery]);

  // Filter by type (client-side)
  const filteredListings = useMemo(() => {
    if (filterType === "all") return listings;
    return listings.filter((listing) => listing.type === filterType);
  }, [listings, filterType]);

  return {
    listings: filteredListings,
    isLoading,
    error,
    refetch: loadListings,
  };
};
