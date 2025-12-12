export type ProficiencyLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type ListingType = "offer" | "want";

export interface Listing {
  id: string;
  userName: string;
  userInitials: string;
  skillTitle: string;
  tags: string[];
  location: string;
  type: ListingType;
  proficiency: ProficiencyLevel;
  description?: string;
  availability?: string;
  rating?: number;
}

export interface ListingsResponse {
  data: Listing[];
  total: number;
  page: number;
  limit: number;
}
