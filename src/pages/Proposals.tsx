import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Check, X } from "lucide-react";

const dummyProposals = {
  received: [
    {
      id: "1",
      userName: "Mike Rodriguez",
      userInitials: "MR",
      skillTitle: "Photography for Web Dev Tutorial",
      status: "pending" as const,
      message: "Hi! I'd love to learn web development from you. In exchange, I can teach you professional photography techniques.",
    },
    {
      id: "2",
      userName: "Emily Watson",
      userInitials: "EW",
      skillTitle: "Yoga Classes for Design Work",
      status: "accepted" as const,
      message: "Interested in trading yoga instruction for your graphic design skills!",
    },
  ],
  sent: [
    {
      id: "3",
      userName: "David Kim",
      userInitials: "DK",
      skillTitle: "Spanish Lessons for Marketing Help",
      status: "pending" as const,
      message: "I can help with your marketing strategy in exchange for Spanish lessons.",
    },
    {
      id: "4",
      userName: "Lisa Martinez",
      userInitials: "LM",
      skillTitle: "Carpentry for Language Exchange",
      status: "declined" as const,
      message: "Would love to help with your carpentry project for language practice.",
    },
    {
      id: "5",
      userName: "James Thompson",
      userInitials: "JT",
      skillTitle: "Cooking Lessons Swap",
      status: "completed" as const,
      message: "Let's exchange cooking techniques!",
    },
  ],
};

const statusColors = {
  pending: "default" as const,
  accepted: "secondary" as const,
  declined: "destructive" as const,
  completed: "outline" as const,
};

const ProposalCard = ({ proposal, type }: { proposal: any; type: "received" | "sent" }) => (
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
      <Button variant="outline" size="sm" className="flex-1">
        <MessageCircle className="w-4 h-4 mr-2" />
        Open Chat
      </Button>
      {type === "received" && proposal.status === "pending" && (
        <>
          <Button size="sm" variant="default">
            <Check className="w-4 h-4 mr-2" />
            Accept
          </Button>
          <Button size="sm" variant="outline">
            <X className="w-4 h-4 mr-2" />
            Decline
          </Button>
        </>
      )}
    </div>
  </Card>
);

const Proposals = () => {
  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Proposals</h1>
          <p className="text-muted-foreground">Manage your skill swap proposals</p>
        </div>

        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="received">
              Received ({dummyProposals.received.length})
            </TabsTrigger>
            <TabsTrigger value="sent">
              Sent ({dummyProposals.sent.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {dummyProposals.received.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} type="received" />
            ))}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {dummyProposals.sent.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} type="sent" />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Proposals;
