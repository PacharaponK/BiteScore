import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResult } from "@/components/AnalysisResult";
import { HistoryCard } from "@/components/HistoryCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import {
  mockFoodClassification,
  mockSentimentAnalysis,
  simulateAIProcessing,
  type AnalysisResult as AnalysisResultType,
} from "@/lib/mockData";
import { saveAnalysis, getAnalysisHistory } from "@/lib/storage";

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ foodType: string; sentiment: string } | null>(null);
  const [history, setHistory] = useState<AnalysisResultType[]>(getAnalysisHistory());
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!imageUrl || !comment.trim()) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and write a comment.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      await simulateAIProcessing(2000);
      
      const foodType = mockFoodClassification();
      const sentiment = mockSentimentAnalysis();

      const analysis: AnalysisResultType = {
        id: Date.now().toString(),
        foodType,
        sentiment,
        comment: comment.trim(),
        imageUrl,
        timestamp: Date.now(),
      };

      saveAnalysis(analysis);
      setHistory([analysis, ...getAnalysisHistory()]);
      setResult({ foodType, sentiment: sentiment as string });

      toast({
        title: "Analysis Complete! 🎉",
        description: `Your ${foodType} review has been analyzed.`,
      });

      // Reset form
      setImageUrl(null);
      setComment("");
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 gradient-hero rounded-2xl p-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            AI-Powered Food Review Platform
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload a food image and share your thoughts. Our AI will classify the dish and analyze your sentiment instantly.
          </p>
        </div>

        {/* Main Analysis Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <ImageUpload imageUrl={imageUrl} onImageSelect={setImageUrl} />
            
            <Card className="p-6">
              <label className="text-sm font-medium mb-2 block">
                Your Review
              </label>
              <Textarea
                placeholder="Share your thoughts about this food... (e.g., 'The pizza was absolutely delicious!')"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </Card>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !imageUrl || !comment.trim()}
              className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Analyze with AI
                </>
              )}
            </Button>
          </div>

          <div>
            {result ? (
              <AnalysisResult foodType={result.foodType} sentiment={result.sentiment} />
            ) : (
              <Card className="p-12 flex items-center justify-center border-dashed">
                <div className="text-center text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Analysis results will appear here</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Recent Reviews
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {history.slice(0, 8).map((item) => (
                <HistoryCard key={item.id} analysis={item} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
