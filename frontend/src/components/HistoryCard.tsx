import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Clock } from "lucide-react";
import { AnalysisResult } from "@/lib/mockData";

interface HistoryCardProps {
  analysis: AnalysisResult;
}

export const HistoryCard = ({ analysis }: HistoryCardProps) => {
  const isPositive = analysis.sentiment === "Positive";
  const date = new Date(analysis.timestamp);

  return (
    <Card className="overflow-hidden hover:shadow-ai transition-shadow">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img
          src={analysis.imageUrl}
          alt={analysis.foodType}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg">{analysis.foodType}</h3>
          {isPositive ? (
            <Badge className="gradient-accent flex items-center gap-1">
              <Smile className="h-3 w-3" />
              {analysis.sentiment}
            </Badge>
          ) : (
            <Badge variant="destructive" className="flex items-center gap-1">
              <Frown className="h-3 w-3" />
              {analysis.sentiment}
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {analysis.comment}
        </p>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
          <Clock className="h-3 w-3" />
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};
