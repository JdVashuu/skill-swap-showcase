export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  email?: string;
  avatarUrl?: string;
  location: string;
  bio: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
  skillsOffered: string[];
  skillsWanted: string[];
  completedSwaps: number;
  availability?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  location?: string;
  bio?: string;
  skillsOffered?: string[];
  skillsWanted?: string[];
  availability?: string;
  avatarUrl?: string;
}
