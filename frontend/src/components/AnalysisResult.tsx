import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Sparkles, UtensilsCrossed } from "lucide-react";
import { predictSentiment } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AnalysisResultProps {
  foodType: string;
  sentiment: string;
  reviewText: string; // เพิ่ม prop สำหรับข้อความรีวิว
}

export const AnalysisResult = ({ foodType, sentiment, reviewText }: AnalysisResultProps) => {
  const [predictedSentiment, setPredictedSentiment] = useState<string>(sentiment);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const result = await predictSentiment(reviewText);
        setPredictedSentiment(result.sentiment);
      } catch (error) {
        console.error("Error fetching sentiment:", error);
      }
    };

    if (reviewText) {
      fetchSentiment();
    }
  }, [reviewText]);

  const isPositive = predictedSentiment === "Positive";

  return (
    <div className="space-y-8 p-8 bg-card rounded-lg shadow-minimal border animate-scale-in">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-background" />
        </div>
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          Analysis Complete
        </h3>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <UtensilsCrossed className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Food Type
            </span>
          </div>
          <p className="text-2xl font-light">{foodType}</p>
        </div>

        <div className="h-px bg-border"></div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            {isPositive ? (
              <Smile className="h-5 w-5 text-green-600" />
            ) : (
              <Frown className="h-5 w-5 text-red-600" />
            )}
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Sentiment
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className="text-base py-2 px-4 font-normal"
            >
              {predictedSentiment}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
