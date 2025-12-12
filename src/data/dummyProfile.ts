import { UserProfile } from "@/types/profile";

export const dummyCurrentUser: UserProfile = {
  id: "user-1",
  name: "Sarah Chen",
  initials: "SC",
  email: "sarah@example.com",
  location: "San Francisco, CA",
  bio: "Full-stack developer passionate about teaching and learning new skills. I love connecting with people and sharing knowledge!",
  memberSince: "March 2024",
  rating: 4.8,
  reviewCount: 12,
  skillsOffered: ["React", "JavaScript", "CSS", "TypeScript", "Node.js"],
  skillsWanted: ["Photography", "Spanish", "Yoga"],
  completedSwaps: 8,
  availability: "Weekends",
};
