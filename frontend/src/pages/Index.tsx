import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
import { predictFood, predictSentiment } from "@/lib/api";
import {
  type AnalysisResult as AnalysisResultType,
} from "@/lib/mockData";
import { saveAnalysis, getAnalysisHistory } from "@/lib/storage";

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ foodType: string; sentiment: string } | null>(null);
  const [history, setHistory] = useState<AnalysisResultType[]>(getAnalysisHistory());
  const { toast } = useToast();

  const handleImageSelect = (url: string | null, file?: File) => {
    setImageUrl(url);
    setImageFile(file || null);
  };

  const handleAnalyze = async () => {
    if (!imageFile || !comment.trim()) {
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
      // Predict food from image
      const foodPrediction = await predictFood(imageFile);

      // Predict sentiment from comment
      const sentimentPrediction = await predictSentiment(comment.trim());

      const analysis: AnalysisResultType = {
        id: Date.now().toString(),
        foodType: foodPrediction.food,
        sentiment: sentimentPrediction.sentiment as "Positive" | "Negative",
        comment: comment.trim(),
        imageUrl: imageUrl!,
        timestamp: Date.now(),
      };

      saveAnalysis(analysis);
      setHistory(prevHistory => [analysis, ...prevHistory]);
      setResult({
        foodType: foodPrediction.food,
        sentiment: sentimentPrediction.sentiment
      });

      toast({
        title: "Analysis Complete! 🎉",
        description: `Your ${foodPrediction.food} review has been analyzed. Sentiment: ${sentimentPrediction.sentiment} (${sentimentPrediction.confidence.toFixed(1)}% confidence)`,
      });

      // Reset form
      setImageUrl(null);
      setImageFile(null);
      setComment("");
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <Header />

      <main className="flex-1 container py-12 lg:py-16">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-light mb-4 tracking-tight"
          >
            Analyze Food
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Upload your food image and share your thoughts for AI analysis.
          </motion.p>
        </motion.div>

        {/* Main Analysis Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <ImageUpload imageUrl={imageUrl} onImageSelect={handleImageSelect} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="space-y-3"
              >
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Your Thoughts
                </label>
                <Textarea
                  placeholder="What did you think about this dish?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none border-2 shadow-minimal focus:shadow-elevated transition-all duration-200 text-base"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              >
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !imageFile || !comment.trim()}
                  className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 text-base font-medium shadow-minimal hover:shadow-elevated"
                >
                  {isAnalyzing ? (
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center justify-center"
                    >
                      <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                      Analyzing...
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center"
                    >
                      <Sparkles className="h-5 w-5 mr-3" />
                      Analyze
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="min-h-[400px]"
            >
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <AnalysisResult foodType={result.foodType} sentiment={result.sentiment} reviewText={comment} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full min-h-[400px] flex items-center justify-center border border-dashed border-muted-foreground/20 rounded-lg"
                  >
                    <div className="text-center text-muted-foreground">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center"
                      >
                        <Sparkles className="h-8 w-8" />
                      </motion.div>
                      <p className="text-lg">Waiting for analysis</p>
                      <p className="text-sm mt-1">Results will appear here</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* History Section */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-light mb-4">
                  Recent Analysis
                </h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
                  className="w-24 h-px bg-foreground/20 mx-auto origin-center"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
              >
                {history.slice(0, 8).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 2.0 + index * 0.1,
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HistoryCard analysis={item} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
