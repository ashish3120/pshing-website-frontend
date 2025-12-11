import { Link2, Cpu, Zap } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Enter URL",
    description: "Paste any suspicious URL you want to verify",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our algorithm scans for phishing indicators",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get a clear verdict in seconds",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold text-center mb-12 text-gradient-primary">
        How It Works
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
              <step.icon className="w-7 h-7 text-primary" />
            </div>
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
