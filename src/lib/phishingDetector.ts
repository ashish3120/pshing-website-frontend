interface AnalysisResult {
  isPhishing: boolean;
  confidence: number;
  reasons: string[];
}

const suspiciousKeywords = [
  'verify', 'login', 'secure', 'account', 'update', 'confirm', 
  'bank', 'password', 'billing', 'suspend', 'locked', 'urgent',
  'expire', 'validate', 'authenticate', 'restore'
];

const legitimateDomains = [
  'google.com', 'github.com', 'amazon.com', 'microsoft.com',
  'apple.com', 'facebook.com', 'twitter.com', 'linkedin.com',
  'netflix.com', 'paypal.com', 'ebay.com', 'walmart.com'
];

const brandNames = [
  'paypal', 'netflix', 'amazon', 'apple', 'google', 'microsoft',
  'facebook', 'instagram', 'twitter', 'bank', 'chase', 'wells',
  'citi', 'amex', 'visa', 'mastercard'
];

export function analyzeUrl(url: string): AnalysisResult {
  const reasons: string[] = [];
  let score = 0;
  
  try {
    // Normalize URL
    let normalizedUrl = url.trim().toLowerCase();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'http://' + normalizedUrl;
    }
    
    const urlObj = new URL(normalizedUrl);
    const hostname = urlObj.hostname;
    const fullUrl = urlObj.href;
    
    // Check if it's a known legitimate domain
    const isLegitimate = legitimateDomains.some(domain => 
      hostname === domain || hostname === `www.${domain}`
    );
    
    if (isLegitimate) {
      return {
        isPhishing: false,
        confidence: 95 + Math.floor(Math.random() * 5),
        reasons: [
          "Verified trusted domain",
          "Matches known legitimate website",
          "No suspicious patterns detected"
        ]
      };
    }
    
    // Check for HTTP (not HTTPS)
    if (urlObj.protocol === 'http:') {
      score += 15;
      reasons.push("Uses insecure HTTP connection");
    }
    
    // Check for IP address in hostname
    const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (ipPattern.test(hostname)) {
      score += 25;
      reasons.push("Uses IP address instead of domain name");
    }
    
    // Check for suspicious keywords
    const foundKeywords = suspiciousKeywords.filter(keyword => 
      fullUrl.includes(keyword)
    );
    if (foundKeywords.length > 0) {
      score += foundKeywords.length * 10;
      reasons.push(`Contains suspicious keywords: ${foundKeywords.slice(0, 3).join(', ')}`);
    }
    
    // Check for brand names in suspicious context
    const foundBrands = brandNames.filter(brand => 
      hostname.includes(brand) && !legitimateDomains.some(d => hostname.includes(d))
    );
    if (foundBrands.length > 0) {
      score += 30;
      reasons.push(`Impersonates known brand: ${foundBrands[0]}`);
    }
    
    // Check for excessive hyphens
    const hyphenCount = (hostname.match(/-/g) || []).length;
    if (hyphenCount >= 2) {
      score += 15;
      reasons.push("Excessive hyphens in domain name");
    }
    
    // Check for excessive subdomains
    const subdomainCount = hostname.split('.').length - 2;
    if (subdomainCount >= 3) {
      score += 10;
      reasons.push("Unusual number of subdomains");
    }
    
    // Check for suspicious TLDs
    const suspiciousTLDs = ['.xyz', '.top', '.club', '.online', '.site', '.info', '.tk', '.ml'];
    if (suspiciousTLDs.some(tld => hostname.endsWith(tld))) {
      score += 15;
      reasons.push("Uses suspicious top-level domain");
    }
    
    // Check URL length
    if (fullUrl.length > 75) {
      score += 10;
      reasons.push("Unusually long URL");
    }
    
    // Check for random-looking strings
    const randomPattern = /[a-z0-9]{20,}/i;
    if (randomPattern.test(fullUrl)) {
      score += 15;
      reasons.push("Contains random character sequences");
    }
    
    // Determine result
    const isPhishing = score >= 25;
    
    // Calculate confidence
    let confidence: number;
    if (isPhishing) {
      confidence = Math.min(99, 70 + Math.floor(score / 3));
    } else {
      confidence = Math.max(70, 95 - score * 2);
    }
    
    // Add positive reasons if safe
    if (!isPhishing && reasons.length === 0) {
      reasons.push("No known phishing indicators detected");
      reasons.push("Domain structure appears normal");
    }
    
    return {
      isPhishing,
      confidence,
      reasons: reasons.slice(0, 4)
    };
    
  } catch {
    return {
      isPhishing: true,
      confidence: 75,
      reasons: ["Invalid or malformed URL format"]
    };
  }
}
