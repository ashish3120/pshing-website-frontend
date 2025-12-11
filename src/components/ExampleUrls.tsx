import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface ExampleUrlsProps {
  onSelectUrl: (url: string) => void;
}

const legitimateUrls = [
  "https://github.com",
  "https://google.com",
  "https://amazon.com",
];

const phishingUrls = [
  "http://paypal-verify-account.com",
  "http://secure-bank-login.net",
  "http://netflix-billing-update.xyz",
];

const ExampleUrls = ({ onSelectUrl }: ExampleUrlsProps) => {
  return (
    <section className="py-12">
      <h2 className="text-xl font-semibold text-center mb-8 text-muted-foreground">
        Try Example URLs
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Legitimate URLs */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-success">Legitimate Sites</h3>
          </div>
          <div className="space-y-2">
            {legitimateUrls.map((url) => (
              <Button
                key={url}
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-muted-foreground hover:text-success hover:bg-success/10"
                onClick={() => onSelectUrl(url)}
              >
                {url}
              </Button>
            ))}
          </div>
        </div>

        {/* Phishing URLs */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-destructive">Phishing Examples</h3>
          </div>
          <div className="space-y-2">
            {phishingUrls.map((url) => (
              <Button
                key={url}
                variant="ghost"
                className="w-full justify-start font-mono text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => onSelectUrl(url)}
              >
                {url}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleUrls;
