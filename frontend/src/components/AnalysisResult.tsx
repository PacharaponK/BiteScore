import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Sparkles, UtensilsCrossed } from "lucide-react";

interface AnalysisResultProps {
  foodType: string;
  sentiment: string;
}

export const AnalysisResult = ({ foodType, sentiment }: AnalysisResultProps) => {
  const isPositive = sentiment === "Positive";

  return (
    <Card className="p-6 animate-scale-in shadow-ai">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg gradient-primary">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Food Classification
            </h3>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-secondary" />
              <span className="text-2xl font-bold">{foodType}</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Sentiment Analysis
            </h3>
            <div className="flex items-center gap-3">
              {isPositive ? (
                <>
                  <Smile className="h-6 w-6 text-accent" />
                  <Badge className="text-base py-1 px-3 gradient-accent">
                    {sentiment}
                  </Badge>
                </>
              ) : (
                <>
                  <Frown className="h-6 w-6 text-destructive" />
                  <Badge variant="destructive" className="text-base py-1 px-3">
                    {sentiment}
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
