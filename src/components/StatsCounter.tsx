import { useEffect, useState } from "react";
import { Shield, Users, AlertTriangle } from "lucide-react";

const stats = [
  { icon: Shield, label: "URLs Scanned", value: 1247893, suffix: "+" },
  { icon: Users, label: "Protected Users", value: 89542, suffix: "" },
  { icon: AlertTriangle, label: "Threats Blocked", value: 34219, suffix: "" },
];

const StatsCounter = () => {
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    setMounted(true);
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      setCounts(stats.map(stat => Math.floor(stat.value * eased)));
      
      if (step >= steps) {
        clearInterval(timer);
        setCounts(stats.map(stat => stat.value));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (!mounted) return null;

  return (
    <section className="py-12">
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="text-center p-4 animate-counter"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl md:text-3xl font-bold text-foreground font-mono">
              {formatNumber(counts[index])}{stat.suffix}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
