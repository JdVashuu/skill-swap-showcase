import { useState, useEffect, useCallback } from "react";
import { Proposal, ProposalsData, ProposalStatus } from "@/types/proposal";
import { dummyProposals } from "@/data/dummyProposals";

interface UseProposalsResult {
  proposals: ProposalsData;
  isLoading: boolean;
  error: Error | null;
  updateProposalStatus: (proposalId: string, status: ProposalStatus) => Promise<void>;
  refetch: () => void;
}

// Simulates API fetch - replace with actual API call when backend is ready
const fetchProposals = async (): Promise<ProposalsData> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/proposals');
  // return response.json();
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dummyProposals;
};

const patchProposalStatus = async (proposalId: string, status: ProposalStatus): Promise<Proposal> => {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/proposals/${proposalId}`, { method: 'PATCH', body: JSON.stringify({ status }) });
  // return response.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const allProposals = [...dummyProposals.received, ...dummyProposals.sent];
  const proposal = allProposals.find((p) => p.id === proposalId);
  
  if (!proposal) throw new Error("Proposal not found");
  
  return { ...proposal, status, updatedAt: new Date() };
};

export const useProposals = (): UseProposalsResult => {
  const [proposals, setProposals] = useState<ProposalsData>(dummyProposals);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProposals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProposals();
      setProposals(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch proposals"));
      setProposals(dummyProposals);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProposalStatus = useCallback(async (proposalId: string, status: ProposalStatus) => {
    try {
      const updatedProposal = await patchProposalStatus(proposalId, status);
      
      setProposals((prev) => ({
        received: prev.received.map((p) =>
          p.id === proposalId ? updatedProposal : p
        ),
        sent: prev.sent.map((p) =>
          p.id === proposalId ? updatedProposal : p
        ),
      }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update proposal"));
      throw err;
    }
  }, []);

  useEffect(() => {
    loadProposals();
  }, []);

  return {
    proposals,
    isLoading,
    error,
    updateProposalStatus,
    refetch: loadProposals,
  };
};
