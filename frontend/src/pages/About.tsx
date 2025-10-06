import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Brain, MessageSquare, Sparkles, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        {/* Hero */}
        <div className="text-center mb-12 gradient-hero rounded-2xl p-12">
          <div className="inline-block p-4 rounded-full gradient-primary mb-6">
            <Sparkles className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Our AI Platform
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Combining cutting-edge AI technology to revolutionize food review analysis
          </p>
        </div>

        {/* AI Models */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 hover:shadow-ai transition-shadow">
            <div className="inline-block p-3 rounded-lg gradient-primary mb-4">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Food Classification Model</h2>
            <p className="text-muted-foreground mb-4">
              Our advanced computer vision AI analyzes food images to accurately identify dish types. 
              Trained on thousands of food images, it can recognize popular dishes from various cuisines.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Key Features:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Identifies 15+ popular food types</li>
                <li>• High accuracy classification</li>
                <li>• Supports various cuisines</li>
                <li>• Real-time image processing</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-ai transition-shadow">
            <div className="inline-block p-3 rounded-lg gradient-secondary mb-4">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Sentiment Analysis Model</h2>
            <p className="text-muted-foreground mb-4">
              Our natural language processing AI evaluates user comments to determine sentiment. 
              It understands context and emotion to classify reviews as positive or negative.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Key Features:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Binary sentiment classification</li>
                <li>• Context-aware analysis</li>
                <li>• Multi-language support potential</li>
                <li>• Instant sentiment detection</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Upload & Review</h3>
              <p className="text-sm text-muted-foreground">
                Upload a food image and write your honest review about the dish
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our dual AI models process the image and text simultaneously
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Get Results</h3>
              <p className="text-sm text-muted-foreground">
                Receive instant classification and sentiment analysis results
              </p>
            </div>
          </div>
        </Card>

        {/* For Business Owners */}
        <Card className="p-8 gradient-hero border-2 border-primary/20">
          <h2 className="text-2xl font-bold mb-4">For Restaurant Owners</h2>
          <p className="text-muted-foreground mb-6">
            Use our Dashboard to gain valuable insights from customer reviews. 
            Filter by food type and sentiment to understand what your customers love and what needs improvement.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="p-1 rounded bg-primary/10 mt-0.5">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Track Trends</p>
                <p className="text-muted-foreground text-xs">Monitor sentiment over time</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="p-1 rounded bg-primary/10 mt-0.5">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Identify Favorites</p>
                <p className="text-muted-foreground text-xs">See which dishes get positive reviews</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;
