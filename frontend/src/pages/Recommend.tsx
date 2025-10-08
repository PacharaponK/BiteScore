import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, ChefHat, Lightbulb, Star } from "lucide-react";
import { recommendFood, type FoodRecommendationResponse } from "@/lib/api";

const Recommend = () => {
  const [description, setDescription] = useState("");
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendation, setRecommendation] = useState<FoodRecommendationResponse | null>(null);
  const { toast } = useToast();

  const handleRecommend = async () => {
    if (!description.trim()) {
      toast({
        title: "Missing Description",
        description: "Please describe what kind of food you're looking for.",
        variant: "destructive",
      });
      return;
    }

    setIsRecommending(true);
    setRecommendation(null);

    try {
      const result = await recommendFood(description.trim());
      setRecommendation(result);

      toast({
        title: "Recommendation Ready! 🍽️",
        description: `Based on your description, we recommend ${result.food_name}!`,
      });
    } catch (error) {
      console.error('Recommendation error:', error);
      toast({
        title: "Recommendation Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRecommending(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    return "text-orange-600";
  };

  const getConfidenceStars = (confidence: number) => {
    const stars = Math.round(confidence * 5);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -80, 120, 0],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 80, 0],
            y: [0, 100, -80, 0],
            scale: [1, 0.7, 1.4, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
        />
      </div>

      <Header />

      <main className="flex-1 container py-12 lg:py-16 relative z-10">
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
            Food Recommendations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Tell us what you're craving and our AI will recommend the perfect dish for you!
          </motion.p>
        </motion.div>

        {/* Main Recommendation Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                className="space-y-3"
              >
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  What are you craving?
                </label>
                <Textarea
                  placeholder="e.g., After work, something sweet and cold that melts in my mouth"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="resize-none border-2 shadow-minimal focus:shadow-elevated transition-all duration-200 text-base"
                />
                <p className="text-xs text-muted-foreground">
                  Describe your mood, occasion, or specific preferences
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              >
                <Button
                  onClick={handleRecommend}
                  disabled={isRecommending || !description.trim()}
                  className="w-full h-14 bg-primary hover:bg-primary/90 transition-all duration-200 text-base font-medium shadow-minimal hover:shadow-elevated"
                >
                  {isRecommending ? (
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center justify-center"
                    >
                      <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                      Finding your perfect dish...
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center"
                    >
                      <Sparkles className="h-5 w-5 mr-3" />
                      Get Recommendation
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            </motion.div>

            {/* Result Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="min-h-[400px]"
            >
              <AnimatePresence mode="wait">
                {recommendation ? (
                  <motion.div
                    key="recommendation"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Card className="p-8 bg-card border-2 border-primary/20 shadow-elevated">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="text-center mb-6"
                      >
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-2xl font-bold mb-2"
                        >
                          Perfect Match!
                        </motion.h3>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center space-y-4"
                      >
                        <motion.h4
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                          className="text-3xl font-bold text-primary"
                        >
                          {recommendation.food_name}
                        </motion.h4>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <span className="text-sm text-muted-foreground">Confidence:</span>
                          <div className="flex items-center gap-1">
                            {getConfidenceStars(recommendation.confidence)}
                          </div>
                          <Badge
                            variant="secondary"
                            className={`${getConfidenceColor(recommendation.confidence)} font-semibold`}
                          >
                            {(recommendation.confidence * 100).toFixed(1)}%
                          </Badge>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                          className="pt-4 border-t border-border/50"
                        >
                          <p className="text-sm text-muted-foreground italic">
                            "{description.trim()}"
                          </p>
                        </motion.div>
                      </motion.div>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full min-h-[400px] flex items-center justify-center border border-dashed border-muted-foreground/20 rounded-lg bg-card/50"
                  >
                    <div className="text-center text-muted-foreground">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                      >
                        <Sparkles className="h-10 w-10 text-primary" />
                      </motion.div>
                      <p className="text-xl font-medium mb-2">Ready to Recommend</p>
                      <p className="text-sm">Describe your craving and we'll suggest the perfect dish!</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Example Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
          className="max-w-4xl mx-auto mt-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-semibold mb-2">Example Suggestions</h2>
            <p className="text-muted-foreground">Try these prompts to get started</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              "Lately, to eat something with vinegared rice and fresh raw fish on top right now.",
              "If I could eat anything, it would be something so cold it makes my teeth chatter",
              "Lately, something sweet and cold that melts in my mouth",
              "I'm craving a frozen dessert with flavors like vanilla, strawberry, or chocolate",
              "I want a dessert that's crunchy outside and soft inside",
              "Lately, a large, hot baked dish with gooey melted cheese on top"
            ].map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.8 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-elevated transition-all duration-200 bg-card/50 hover:bg-card border-primary/20"
                  onClick={() => setDescription(suggestion)}
                >
                  <p className="text-sm text-center">{suggestion}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommend;