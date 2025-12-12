export type ProposalStatus = "pending" | "accepted" | "declined" | "completed";

export interface Proposal {
  id: string;
  userId: string;
  userName: string;
  userInitials: string;
  skillTitle: string;
  status: ProposalStatus;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProposalsData {
  received: Proposal[];
  sent: Proposal[];
}

export interface UpdateProposalPayload {
  proposalId: string;
  status: ProposalStatus;
}
