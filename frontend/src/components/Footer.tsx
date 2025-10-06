import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t py-6 mt-auto">
      <div className="container flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4" />
        <span>Powered by AI Mock Engine</span>
      </div>
    </footer>
  );
};
