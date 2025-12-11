import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShieldIconProps {
  status: 'idle' | 'scanning' | 'safe' | 'danger';
  className?: string;
}

const ShieldIcon = ({ status, className }: ShieldIconProps) => {
  const baseClasses = "transition-all duration-500";
  
  if (status === 'idle') {
    return (
      <div className={cn("relative", className)}>
        <Shield 
          className={cn(baseClasses, "w-20 h-20 text-primary animate-glow-pulse")} 
          strokeWidth={1.5}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 animate-ping" />
        </div>
      </div>
    );
  }
  
  if (status === 'scanning') {
    return (
      <div className={cn("relative", className)}>
        <Shield 
          className={cn(baseClasses, "w-20 h-20 text-primary")} 
          strokeWidth={1.5}
        />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
        </div>
      </div>
    );
  }
  
  if (status === 'safe') {
    return (
      <div className={cn("relative", className)}>
        <ShieldCheck 
          className={cn(baseClasses, "w-20 h-20 text-success animate-scale-in glow-success rounded-full")} 
          strokeWidth={1.5}
        />
      </div>
    );
  }
  
  return (
    <div className={cn("relative", className)}>
      <ShieldAlert 
        className={cn(baseClasses, "w-20 h-20 text-destructive animate-scale-in glow-danger rounded-full")} 
        strokeWidth={1.5}
      />
    </div>
  );
};

export default ShieldIcon;
