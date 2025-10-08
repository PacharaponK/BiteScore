import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ChefHat } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <Header />

      <main className="flex-1 container py-20 lg:py-32">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight">
            BiteScore
            <span className="block font-normal text-muted-foreground mt-4">
              AI Food Intelligence
            </span>
          </h1>
          <p className="text-muted-foreground text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
            Analyze food images, get AI recommendations, and track your dining experiences.
            <span className="block mt-3 text-lg lg:text-xl">
              Upload, analyze, discover.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/analyze">
              <Button className="h-14 px-8 bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 text-base font-medium shadow-minimal hover:shadow-elevated">
                <Sparkles className="h-5 w-5 mr-3" />
                Start Analyzing
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
            </Link>
            <Link to="/recommend">
              <Button className="h-14 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                <ChefHat className="h-5 w-5 mr-3" />
                Get Recommendations
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="h-14 px-8 text-base font-medium border-muted-foreground/20 hover:border-foreground/30">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-12 max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-background" />
            </div>
            <h3 className="text-xl font-medium mb-4">Food Recognition</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced AI identifies food from your images with high accuracy and detailed analysis.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-4">Sentiment Analysis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Understand the emotional tone of your food reviews with intelligent sentiment detection.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-4">Smart Recommendations</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get personalized food suggestions based on your cravings and preferences using AI.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;