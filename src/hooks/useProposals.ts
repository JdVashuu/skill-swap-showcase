import { useState, useEffect, useCallback } from "react";
import { ProposalsData, ProposalStatus } from "@/types/proposal";
import { dummyProposals } from "@/data/dummyProposals";
import { api } from "@/lib/api";

interface UseProposalsResult {
  proposals: ProposalsData;
  isLoading: boolean;
  error: Error | null;
  updateProposalStatus: (proposalId: string, status: ProposalStatus) => Promise<void>;
  refetch: () => void;
}

export const useProposals = (): UseProposalsResult => {
  const [proposals, setProposals] = useState<ProposalsData>(dummyProposals);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProposals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getProposals();
      if (data.received.length > 0 || data.sent.length > 0) {
        setProposals(data);
      }
    } catch (err) {
      console.log("Using dummy data - Flask backend not available");
      setError(err instanceof Error ? err : new Error("Failed to fetch proposals"));
      setProposals(dummyProposals);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProposalStatus = useCallback(async (proposalId: string, status: ProposalStatus) => {
    // Optimistic update
    setProposals((prev) => ({
      received: prev.received.map((p) =>
        p.id === proposalId ? { ...p, status, updatedAt: new Date() } : p
      ),
      sent: prev.sent.map((p) =>
        p.id === proposalId ? { ...p, status, updatedAt: new Date() } : p
      ),
    }));

    try {
      await api.updateProposal(proposalId, { status });
    } catch (err) {
      console.log("Status updated locally - Flask backend not available");
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
