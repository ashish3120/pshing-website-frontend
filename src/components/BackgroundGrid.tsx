const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.03) 2px, hsl(var(--primary) / 0.03) 4px)',
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundGrid;
