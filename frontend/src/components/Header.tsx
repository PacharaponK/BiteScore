import { Moon, Sun, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-border/50">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-background" />
            </div>
            <span className="font-medium text-xl tracking-tight">
              BiteScore
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-all hover:text-foreground ${isActive("/") ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Home
            </Link>
            <Link
              to="/analyze"
              className={`text-sm font-medium transition-all hover:text-foreground ${isActive("/analyze") ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Analyze
            </Link>
            <Link
              to="/recommend"
              className={`text-sm font-medium transition-all hover:text-foreground ${isActive("/recommend") ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Recommend
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-all hover:text-foreground ${isActive("/about") ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              About
            </Link>
          </nav>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};
