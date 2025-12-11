import { ShieldCheck, ShieldAlert, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfidenceMeter from "./ConfidenceMeter";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  isPhishing: boolean;
  confidence: number;
  url: string;
  reasons: string[];
  onReset: () => void;
}

const ResultCard = ({ isPhishing, confidence, url, reasons, onReset }: ResultCardProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <div className={cn(
        "glass-card p-8 space-y-6",
        isPhishing ? "border-destructive/50" : "border-success/50"
      )}>
        {/* Status Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={cn(
            "p-4 rounded-full animate-scale-in",
            isPhishing 
              ? "bg-destructive/20 glow-danger" 
              : "bg-success/20 glow-success"
          )}>
            {isPhishing ? (
              <ShieldAlert className="w-16 h-16 text-destructive" strokeWidth={1.5} />
            ) : (
              <ShieldCheck className="w-16 h-16 text-success" strokeWidth={1.5} />
            )}
          </div>
          
          <div>
            <h2 className={cn(
              "text-3xl font-bold mb-2",
              isPhishing ? "text-destructive" : "text-success"
            )}>
              {isPhishing ? "⚠️ Phishing Detected" : "✓ Safe to Visit"}
            </h2>
            <p className="text-muted-foreground">
              {isPhishing 
                ? "This URL shows signs of being a phishing attempt" 
                : "This URL appears to be legitimate"}
            </p>
          </div>
        </div>

        {/* URL Display */}
        <div className="glass-input p-4 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Analyzed URL</p>
          <p className="font-mono text-sm break-all text-foreground/80">{url}</p>
        </div>

        {/* Confidence Meter */}
        <ConfidenceMeter confidence={confidence} status={isPhishing ? 'danger' : 'safe'} />

        {/* Reasons */}
        {reasons.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {isPhishing ? "Warning Signs Detected:" : "Positive Indicators:"}
            </p>
            <ul className="space-y-1">
              {reasons.map((reason, index) => (
                <li 
                  key={index}
                  className={cn(
                    "text-sm flex items-center gap-2 animate-fade-in",
                    isPhishing ? "text-destructive/80" : "text-success/80"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span>{isPhishing ? "•" : "✓"}</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reset Button */}
        <Button 
          onClick={onReset}
          variant="glass"
          size="lg"
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Scan Another URL
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;
