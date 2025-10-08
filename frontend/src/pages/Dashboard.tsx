import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Smile, Frown, TrendingUp, Clock, Filter, Lock, User, LogOut, Eye, EyeOff } from "lucide-react";
import { getAnalysisHistory } from "@/lib/storage";
import { FOOD_TYPES, type Sentiment } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Login form component
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await login(username.trim(), password);

    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Try: admin/admin123, demo/demo123, or user/user123",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome! 🎉",
        description: "You have successfully logged in.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 glass-effect">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Dashboard Login</h1>
              <p className="text-muted-foreground">Sign in to access your dashboard</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your username"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-muted/50 rounded-lg"
            >
              <p className="text-sm text-muted-foreground mb-2">Demo Accounts:</p>
              <div className="text-xs space-y-1">
                <div>admin / admin123</div>
                <div>demo / demo123</div>
                <div>user / user123</div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

const Dashboard = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const history = getAnalysisHistory();
  const [selectedFood, setSelectedFood] = useState<string>("all");
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all");

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <Header />

      <main className="flex-1 container py-8">
        {/* Header with user info and logout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.username}! Monitor and analyze all food reviews
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              icon: TrendingUp,
              label: "Total Reviews",
              value: stats.total,
              bgColor: "bg-primary/10",
              iconColor: "text-primary",
              delay: 0.1,
            },
            {
              icon: Smile,
              label: "Positive",
              value: stats.positive,
              bgColor: "bg-accent/10",
              iconColor: "text-accent",
              delay: 0.2,
            },
            {
              icon: Frown,
              label: "Negative",
              value: stats.negative,
              bgColor: "bg-destructive/10",
              iconColor: "text-destructive",
              delay: 0.3,
            },
            {
              icon: TrendingUp,
              label: "Positive Rate",
              value: `${stats.positiveRate}%`,
              bgColor: "bg-white/20",
              iconColor: "text-white",
              isGradient: true,
              delay: 0.4,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Card className={`p-6 ${stat.isGradient ? 'gradient-accent' : ''} hover:shadow-elevated transition-shadow`}>
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.8, delay: stat.delay + 0.2 }}
                    className={`p-3 rounded-lg ${stat.bgColor}`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </motion.div>
                  <div className={stat.isGradient ? 'text-white' : ''}>
                    <p className={`text-sm ${stat.isGradient ? 'opacity-90' : 'text-muted-foreground'}`}>
                      {stat.label}
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: stat.delay + 0.5 }}
                      className="text-2xl font-bold"
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="p-6 mb-6 hover:shadow-elevated transition-shadow">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 mb-4"
            >
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Filters</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
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
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
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
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Reviews List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <h2 className="text-xl font-semibold mb-4">
            Reviews ({filteredHistory.length})
          </h2>

          <AnimatePresence mode="wait">
            {filteredHistory.length === 0 ? (
              <motion.div
                key="no-reviews"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-12 text-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-muted-foreground">No reviews found with the selected filters.</p>
                  </motion.div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="reviews-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredHistory.map((item, index) => {
                  const isPositive = item.sentiment === "Positive";
                  const date = new Date(item.timestamp);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      layout
                    >
                      <Card className="overflow-hidden hover:shadow-ai transition-shadow">
                        <div className="flex flex-col sm:flex-row gap-4 p-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted"
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.foodType}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <motion.h3
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.1 + 0.2 }}
                                  className="font-semibold text-lg"
                                >
                                  {item.foodType}
                                </motion.h3>
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3 }}
                                  className="text-sm text-muted-foreground mt-1"
                                >
                                  {item.comment}
                                </motion.p>
                              </div>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  delay: index * 0.1 + 0.4,
                                  type: "spring",
                                  stiffness: 200
                                }}
                              >
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
                              </motion.div>
                            </div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + 0.5 }}
                              className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t"
                            >
                              <Clock className="h-3 w-3" />
                              {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                            </motion.div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
