import { useState, useEffect, useCallback } from "react";
import { UserProfile, UpdateProfilePayload } from "@/types/profile";
import { dummyCurrentUser } from "@/data/dummyProfile";
import { api } from "@/lib/api";

interface UseProfileResult {
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  refetch: () => void;
}

export const useProfile = (): UseProfileResult => {
  const [profile, setProfile] = useState<UserProfile | null>(dummyCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getProfile();
      if (data) setProfile(data);
    } catch (err) {
      console.log("Using dummy data - Flask backend not available");
      setError(err instanceof Error ? err : new Error("Failed to fetch profile"));
      setProfile(dummyCurrentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    // Optimistic update
    setProfile((prev) => prev ? { ...prev, ...payload } : null);
    
    try {
      await api.updateProfile("user-1", payload);
    } catch (err) {
      console.log("Profile updated locally - Flask backend not available");
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    refetch: loadProfile,
  };
};
