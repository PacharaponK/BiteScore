import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Smile, Frown, TrendingUp, Clock, Filter } from "lucide-react";
import { getAnalysisHistory } from "@/lib/storage";
import { FOOD_TYPES, type Sentiment } from "@/lib/mockData";

const Dashboard = () => {
  const history = getAnalysisHistory();
  const [selectedFood, setSelectedFood] = useState<string>("all");
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all");

  // Get unique food types from history
  const availableFoods = useMemo(() => {
    const foods = new Set(history.map((item) => item.foodType));
    return Array.from(foods).sort();
  }, [history]);

  // Filter history
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const foodMatch = selectedFood === "all" || item.foodType === selectedFood;
      const sentimentMatch =
        selectedSentiment === "all" || item.sentiment === selectedSentiment;
      return foodMatch && sentimentMatch;
    });
  }, [history, selectedFood, selectedSentiment]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredHistory.length;
    const positive = filteredHistory.filter((item) => item.sentiment === "Positive").length;
    const negative = total - positive;
    const positiveRate = total > 0 ? ((positive / total) * 100).toFixed(1) : "0";

    return { total, positive, negative, positiveRate };
  }, [filteredHistory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and analyze all food reviews
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Smile className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Positive</p>
                <p className="text-2xl font-bold">{stats.positive}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <Frown className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Negative</p>
                <p className="text-2xl font-bold">{stats.negative}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 gradient-accent">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-white/20">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-white">
                <p className="text-sm opacity-90">Positive Rate</p>
                <p className="text-2xl font-bold">{stats.positiveRate}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Food Type</label>
              <Select value={selectedFood} onValueChange={setSelectedFood}>
                <SelectTrigger>
                  <SelectValue placeholder="All foods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Foods</SelectItem>
                  {availableFoods.map((food) => (
                    <SelectItem key={food} value={food}>
                      {food}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sentiment</label>
              <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                <SelectTrigger>
                  <SelectValue placeholder="All sentiments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="Positive">Positive</SelectItem>
                  <SelectItem value="Negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Reviews List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Reviews ({filteredHistory.length})
          </h2>
          
          {filteredHistory.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No reviews found with the selected filters.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item) => {
                const isPositive = item.sentiment === "Positive";
                const date = new Date(item.timestamp);

                return (
                  <Card key={item.id} className="overflow-hidden hover:shadow-ai transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.imageUrl}
                          alt={item.foodType}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{item.foodType}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.comment}
                            </p>
                          </div>
                          {isPositive ? (
                            <Badge className="gradient-accent flex items-center gap-1 flex-shrink-0">
                              <Smile className="h-3 w-3" />
                              {item.sentiment}
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="flex items-center gap-1 flex-shrink-0">
                              <Frown className="h-3 w-3" />
                              {item.sentiment}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
                          <Clock className="h-3 w-3" />
                          {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
