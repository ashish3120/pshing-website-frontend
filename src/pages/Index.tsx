import { useState } from "react";
import { Search, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/BackgroundGrid";
import ShieldIcon from "@/components/ShieldIcon";
import ResultCard from "@/components/ResultCard";
import HowItWorks from "@/components/HowItWorks";
import ExampleUrls from "@/components/ExampleUrls";
import StatsCounter from "@/components/StatsCounter";
import { predictUrl } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type Status = 'idle' | 'scanning' | 'result';

interface Result {
  isPhishing: boolean;
  confidence: number;
  reasons: string[];
}

const Index = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<Result | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast({
        title: "Enter a URL",
        description: "Please paste a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setStatus('scanning');

    try {
      // Call the backend API for prediction
      const analysisResult = await predictUrl(url);
      setResult(analysisResult);
      setStatus('result');

      toast({
        title: analysisResult.isPhishing ? "⚠️ Phishing Detected" : "✓ URL is Safe",
        description: analysisResult.isPhishing
          ? "This URL shows signs of being malicious"
          : "This URL appears to be legitimate",
      });
    } catch (error) {
      setStatus('idle');
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unable to analyze URL. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setUrl("");
    setStatus('idle');
    setResult(null);
  };

  const handleSelectExample = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setStatus('idle');
    setResult(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundGrid />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="mb-8 animate-float">
            <ShieldIcon
              status={status === 'scanning' ? 'scanning' : 'idle'}
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-primary">Phishing URL</span>{" "}
            <span className="text-foreground">Detector</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            AI-powered protection against malicious websites.
            <span className="text-primary"> Instant analysis. Zero risk.</span>
          </p>

          {/* URL Input */}
          {status !== 'result' && (
            <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
              <div className="glass-card p-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                      placeholder="Paste URL here (e.g., http://paypal-secure-login.com)"
                      className="w-full h-14 pl-12 pr-4 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                      disabled={status === 'scanning'}
                    />
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    variant="cyber"
                    size="xl"
                    disabled={status === 'scanning'}
                    className="min-w-[160px]"
                  >
                    {status === 'scanning' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        Analyze URL
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {status === 'scanning' && (
                <p className="text-sm text-muted-foreground animate-pulse">
                  Analyzing URL for phishing indicators...
                </p>
              )}
            </div>
          )}

          {/* Result Card */}
          {status === 'result' && result && (
            <ResultCard
              isPhishing={result.isPhishing}
              confidence={result.confidence}
              url={url}
              reasons={result.reasons}
              onReset={handleReset}
            />
          )}
        </section>

        {/* Stats */}
        <StatsCounter />

        {/* How It Works */}
        <HowItWorks />

        {/* Example URLs */}
        {status !== 'result' && (
          <ExampleUrls onSelectUrl={handleSelectExample} />
        )}

        {/* Footer */}
        <footer className="text-center py-12 mt-8 border-t border-border/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">PhishGuard</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Protecting users from phishing attacks worldwide
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
