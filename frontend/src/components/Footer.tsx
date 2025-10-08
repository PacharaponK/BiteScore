import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 mt-auto">
      <div className="container">
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-background" />
          </div>
          <span className="font-medium">Powered by AI Intelligence</span>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            © 2024 BiteScore. Modern food analysis platform.
          </p>
        </div>
      </div>
    </footer>
  );
};
