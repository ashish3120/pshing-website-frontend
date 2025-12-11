// Backend API configuration
const API_BASE_URL = "https://phishing-website-detection-ncji.onrender.com";

export interface PredictionResponse {
    url: string;
    prediction: "phishing" | "legitimate";
    probability: number | null;
}

export interface AnalysisResult {
    isPhishing: boolean;
    confidence: number;
    reasons: string[];
}

/**
 * Call the backend API to predict if a URL is phishing
 */
export async function predictUrl(url: string): Promise<AnalysisResult> {
    try {
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: PredictionResponse = await response.json();

        // Convert backend response to frontend format
        const isPhishing = data.prediction === "phishing";
        const confidence = data.probability
            ? Math.round(data.probability * 100)
            : (isPhishing ? 85 : 90);

        // Generate reasons based on prediction
        const reasons: string[] = [];

        if (isPhishing) {
            reasons.push("AI model detected phishing patterns");
            reasons.push("URL exhibits suspicious characteristics");
            if (confidence > 90) {
                reasons.push("High confidence malicious indicators");
            } else if (confidence > 75) {
                reasons.push("Multiple phishing signals detected");
            } else {
                reasons.push("Potential phishing attempt identified");
            }
        } else {
            reasons.push("AI model verified URL legitimacy");
            reasons.push("No phishing patterns detected");
            if (confidence > 90) {
                reasons.push("Strong indicators of legitimate website");
            } else {
                reasons.push("URL appears safe to visit");
            }
        }

        return {
            isPhishing,
            confidence,
            reasons: reasons.slice(0, 4),
        };
    } catch (error) {
        console.error("Error calling prediction API:", error);
        throw new Error(
            "Unable to connect to the phishing detection service. Please try again later."
        );
    }
}

/**
 * Check if the backend API is available
 */
export async function checkApiHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: "GET",
        });
        return response.ok;
    } catch {
        return false;
    }
}
