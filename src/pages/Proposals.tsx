import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Check, X, Loader2 } from "lucide-react";
import { useProposals } from "@/hooks/useProposals";
import { Proposal, ProposalStatus } from "@/types/proposal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const statusColors: Record<ProposalStatus, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "default",
  accepted: "secondary",
  declined: "destructive",
  completed: "outline",
};

interface ProposalCardProps {
  proposal: Proposal;
  type: "received" | "sent";
  onUpdateStatus: (proposalId: string, status: ProposalStatus) => Promise<void>;
}

const ProposalCard = ({ proposal, type, onUpdateStatus }: ProposalCardProps) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (status: ProposalStatus) => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(proposal.id, status);
      toast.success(`Proposal ${status === "accepted" ? "accepted" : "declined"} successfully!`);
    } catch (error) {
      toast.error("Failed to update proposal status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenChat = () => {
    // Navigate to messages - in real app, would pass conversation ID
    navigate("/messages");
  };

  return (
    <Card className="p-6 card-shadow">
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {proposal.userInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold mb-1">{proposal.userName}</h3>
              <p className="text-sm text-muted-foreground">{proposal.skillTitle}</p>
            </div>
            <Badge variant={statusColors[proposal.status]}>
              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-3">{proposal.message}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleOpenChat}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Open Chat
        </Button>
        {type === "received" && proposal.status === "pending" && (
          <>
            <Button 
              size="sm" 
              variant="default"
              onClick={() => handleStatusUpdate("accepted")}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              Accept
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleStatusUpdate("declined")}
              disabled={isUpdating}
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

const Proposals = () => {
  const { proposals, isLoading, error, updateProposalStatus } = useProposals();

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 md:pt-20">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Proposals</h1>
          <p className="text-muted-foreground">Manage your skill swap proposals</p>
        </div>

        {error && (
          <div className="text-center py-4 mb-4 text-destructive">
            Failed to load proposals. Showing cached data.
          </div>
        )}

        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="received">
              Received ({proposals.received.length})
            </TabsTrigger>
            <TabsTrigger value="sent">
              Sent ({proposals.sent.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {proposals.received.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No received proposals yet
              </div>
            ) : (
              proposals.received.map((proposal) => (
                <ProposalCard 
                  key={proposal.id} 
                  proposal={proposal} 
                  type="received" 
                  onUpdateStatus={updateProposalStatus}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {proposals.sent.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No sent proposals yet
              </div>
            ) : (
              proposals.sent.map((proposal) => (
                <ProposalCard 
                  key={proposal.id} 
                  proposal={proposal} 
                  type="sent" 
                  onUpdateStatus={updateProposalStatus}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Proposals;
