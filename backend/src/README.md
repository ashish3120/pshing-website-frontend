# 🔍 Phishing URL Detection using Machine Learning

This project aims to detect phishing websites using URL-based machine learning techniques. The model analyzes lexical and structural patterns in URLs and predicts whether a given URL is **legitimate** or **phishing** with extremely high accuracy.

---

## 🚀 Project Overview

Phishing attacks are one of the most common cyber threats used to steal user credentials, financial information, and sensitive data.  
This project uses **Machine Learning** to automatically classify URLs as:

- ✔️ **Legitimate**
- ⚠️ **Phishing**

The model is trained on a large dataset of **100K+ URLs**, extracted from real-world sources and enriched with feature engineering.

---

## 📂 Dataset

- Total samples: **101,218**
- Class distribution:
  - **63,678 legitimate URLs**
  - **37,540 phishing URLs**
- Source: Public cybersecurity dataset (ScienceDirect) + OpenPhish feed

---

## 🧠 Features Used

The model extracts meaningful patterns from URLs, such as:

| Feature Type | Examples |
|-------------|----------|
| URL Structure | Length, subdomains, hyphens, digits |
| Domain Indicators | TLD length, popularity, HTTPS usage |
| Entropy Features | Randomness in characters |
| Suspicious Patterns | File extensions, query parameters, keywords |

These features help differentiate real websites from fraudulent ones.

---

## 🧪 Model Training

Models evaluated:

| Model | Result |
|-------|--------|
| Logistic Regression |
| Support Vector Machine |
| Naive Bayes |
| XGBoost |
| **Random Forest (Selected Model)**  |✔

**Best Model:** Random Forest  
**Performance Metrics:**

| Metric | Score |
|--------|-------|
| Accuracy | **0.9995** |
| Precision | **0.9999** |
| Recall | **0.9992** |
| ROC-AUC | **0.99999** |

---

## 🧾 Prediction Example

python
print(predict_url("https://secure-paypal-login-update-verification.com"))
# Output: ⚠️ Phishing Website
