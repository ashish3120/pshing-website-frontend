from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from extract_features import extract_features

app = Flask(__name__)
CORS(app)

# Load model + column order
model = joblib.load("best_model.pkl")
training_columns = joblib.load("training_columns.pkl")

@app.route("/")
def index():
    return jsonify({"message": "Phishing Detection API is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data or "url" not in data:
            return jsonify({"error": "Provide JSON: {\"url\": \"https://example.com\"}"}), 400

        url = data["url"]

        # Extract features
        feats = extract_features(url)

        # Align with training columns
        row = {col: feats.get(col, 0) for col in training_columns}
        df = pd.DataFrame([row])

        pred = model.predict(df)[0]
        # FIX: Model was trained with inverted labels (1=legitimate, 0=phishing)
        label = "legitimate" if pred == 1 else "phishing"

        prob = None
        if hasattr(model, "predict_proba"):
            prob = float(model.predict_proba(df)[0].max())

        return jsonify({
            "url": url,
            "prediction": label,
            "probability": prob
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

