import { useState, useEffect, useMemo } from "react";
import { Listing } from "@/types/listing";
import { dummyListings } from "@/data/dummyListings";

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

// Simulates API fetch - replace with actual API call when backend is ready
const fetchListings = async (): Promise<Listing[]> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/listings');
  // return response.json();
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dummyListings;
};

export const useListings = (options: UseListingsOptions = {}): UseListingsResult => {
  const { searchQuery = "", filterType = "all" } = options;
  const [listings, setListings] = useState<Listing[]>(dummyListings); // Fallback to dummy data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchListings();
      setListings(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch listings"));
      // Keep dummy data as fallback on error
      setListings(dummyListings);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  // Filter and search logic
  const filteredListings = useMemo(() => {
    let result = listings;

    // Filter by type
    if (filterType !== "all") {
      result = result.filter((listing) => listing.type === filterType);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (listing) =>
          listing.skillTitle.toLowerCase().includes(query) ||
          listing.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          listing.userName.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query)
      );
    }

    return result;
  }, [listings, searchQuery, filterType]);

  return {
    listings: filteredListings,
    isLoading,
    error,
    refetch: loadListings,
  };
};
