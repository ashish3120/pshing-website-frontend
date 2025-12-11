import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  confidence: number;
  status: 'safe' | 'danger';
}

const ConfidenceMeter = ({ confidence, status }: ConfidenceMeterProps) => {
  const isSafe = status === 'safe';
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Confidence Level</span>
        <span className={cn(
          "font-mono font-bold text-lg",
          isSafe ? "text-success" : "text-destructive"
        )}>
          {confidence}%
        </span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out animate-fill",
            isSafe 
              ? "bg-gradient-to-r from-success to-emerald-400" 
              : "bg-gradient-to-r from-destructive to-warning"
          )}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
};

export default ConfidenceMeter;
