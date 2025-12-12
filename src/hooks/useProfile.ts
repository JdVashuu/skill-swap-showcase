import { useState, useEffect, useCallback } from "react";
import { UserProfile, UpdateProfilePayload } from "@/types/profile";
import { dummyCurrentUser } from "@/data/dummyProfile";

interface UseProfileResult {
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  refetch: () => void;
}

// Simulates API fetch - replace with actual API call when backend is ready
const fetchProfile = async (): Promise<UserProfile> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/profile');
  // return response.json();
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dummyCurrentUser;
};

const patchProfile = async (payload: UpdateProfilePayload): Promise<UserProfile> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/profile', { method: 'PATCH', body: JSON.stringify(payload) });
  // return response.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { ...dummyCurrentUser, ...payload };
};

export const useProfile = (): UseProfileResult => {
  const [profile, setProfile] = useState<UserProfile | null>(dummyCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch profile"));
      setProfile(dummyCurrentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    try {
      const updatedProfile = await patchProfile(payload);
      setProfile(updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update profile"));
      throw err;
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
