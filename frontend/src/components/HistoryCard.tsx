import { motion } from "framer-motion";
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
    <motion.div
      className="group overflow-hidden bg-card rounded-lg border cursor-pointer"
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="aspect-[4/3] relative overflow-hidden bg-muted"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={analysis.imageUrl}
          alt={analysis.foodType}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute top-3 right-3"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <Badge
            variant={isPositive ? "default" : "destructive"}
            className="text-xs shadow-elevated backdrop-blur-sm"
          >
            {isPositive ? (
              <Smile className="h-3 w-3 mr-1" />
            ) : (
              <Frown className="h-3 w-3 mr-1" />
            )}
            {analysis.sentiment}
          </Badge>
        </motion.div>
      </motion.div>

      <motion.div
        className="p-4 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <motion.h3
          className="font-medium text-lg leading-tight"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {analysis.foodType}
        </motion.h3>

        <motion.p
          className="text-sm text-muted-foreground line-clamp-2 leading-relaxed"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {analysis.comment}
        </motion.p>

        <motion.div
          className="flex items-center gap-2 text-xs text-muted-foreground pt-1"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Clock className="h-3 w-3" />
          <span>{date.toLocaleDateString()}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
