import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Welcome to SkillSwap</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Trade Skills,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Not Cash
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Connect with your community to exchange skills and services without money. Learn, teach, and grow together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            <Button asChild size="lg" className="group">
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 card-shadow hover:card-shadow-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground">
                List the skills you can offer and what you'd like to learn in return.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 card-shadow hover:card-shadow-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Find Matches</h3>
              <p className="text-muted-foreground">
                Browse listings and connect with people who have what you need.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 card-shadow hover:card-shadow-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Swap & Grow</h3>
              <p className="text-muted-foreground">
                Exchange skills, build relationships, and expand your abilities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
