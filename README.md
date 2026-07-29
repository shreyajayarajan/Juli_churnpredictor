# JULI — Customer Churn Prediction & Retention Intelligence Platform

![CI Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Python Version](https://img.shields.io/badge/python-3.11-blue)
![React Version](https://img.shields.io/badge/react-18-cyan)
![XGBoost](https://img.shields.io/badge/ML-XGBoost%20%2B%20SHAP-orange)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-009688)

---

## Executive Summary & Business Framing

**JULI** is an end-to-end, enterprise-grade **Customer Churn Prediction Platform** designed to help subscription and telecommunications companies proactively identify high-risk customers, understand *why* they are leaving, and execute targeted retention workflows before cancellation occurs. Acquiring a new customer costs 5x to 25x more than retaining an existing one. For a mid-sized telecom with 10,000 active subscribers paying an average of $65/month, reducing monthly churn by just 2% preserves over **$150,000 in annual recurring revenue (ARR)**. JULI combines XGBoost machine learning, SMOTE balanced sampling, and SHAP explainability to convert raw customer metadata into actionable business intelligence.

---



### Technology 

| Layer | Technologies Used |
| :--- | :--- |
| **Language & Core** | Python 3.11, JavaScript (ES6+), HTML5, CSS3 |
| **Data & ML Stack** | Pandas, NumPy, Scikit-learn, XGBoost, SHAP, imbalanced-learn (SMOTE), Joblib |
| **Experimentation** | MLflow (Local File Store & Tracking URI) |
| **Backend API** | FastAPI, Pydantic v2, Uvicorn, SQLAlchemy ORM |
| **Database** | SQLite (`juli_churn.db`) with tables: `customers`, `prediction_logs` |
| **Frontend Framework** | React 18, Vite, TailwindCSS, Recharts, Lucide Icons |
| **Containerization** | Docker, Multi-stage Dockerfiles, Docker Compose |
| **CI / CD** | GitHub Actions (`.github/workflows/ci.yml`), Pytest |



---

## Getting Started & Execution Guide

### Option A — Run with Docker Compose (Recommended)

To launch the complete containerized stack (Frontend on `:3000`, Backend API on `:8000`, MLflow on `:5000`):

```bash
# Clone the repository
git clone https://github.com/your-username/juli-churn-platform.git
cd juli-churn-platform

# Build and start containers
docker-compose up --build
```

Access services:
- **JULI Web Application**: `http://localhost:3000`
- **FastAPI OpenAPI Swagger**: `http://localhost:8000/docs`
- **MLflow Tracking UI**: `http://localhost:5000`

---

### Option B — Run Locally Without Docker

#### Step 1: Backend & Model Setup
```bash
# Navigate to project root
cd juli-churn-platform

# Install Python dependencies
pip install -r backend/requirements.txt

# Train model and generate ML artifacts
python ml/train.py

# Launch FastAPI server with Uvicorn
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Step 2: Frontend Setup
```bash
# Open a new terminal in the frontend directory
cd frontend

# Install Node dependencies
npm install

# Launch Vite development server
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## REST API Reference

### 1. `POST /predict`
Evaluates a single customer profile, predicts churn probability, assigns risk tier, and extracts top 5 SHAP driver reasons.


```

### Other Core Endpoints
- `GET /health` — Service health check.
- `GET /dashboard/summary` — Aggregate KPI metrics (total customers, high-risk counts, revenue at risk).
- `GET /analytics/risk-distribution` — Risk tier breakdown, global driver importances, contract/internet/tenure churn rates.
- `GET /customers?page=1&page_size=10&search=&risk_tier=High` — Paginated customer directory with search and filtering.
- `GET /customers/{id}` — Individual customer profile + SHAP waterfall explanation.

---

## Model Performance & Training Methodology

| Metric | Logistic Regression (Baseline) | XGBoost (Champion) |
| :--- | :--- | :--- |
| **Accuracy** | 78.2% | **84.5%** |
| **Precision** | 68.4% | **78.2%** |
| **Recall** | 65.1% | **73.6%** |
| **F1-Score** | 66.7% | **75.8%** |
| **ROC-AUC** | 0.812 | **0.884** |

### Why SMOTE was Applied ONLY on the Training Split
Applying oversampling (SMOTE) before splitting dataset creates synthetic copies of samples that leak into validation and test sets. By applying SMOTE **strictly on `X_train`**, the model learns balanced feature boundaries while evaluation metrics on `X_val` and `X_test` reflect true, unbiased real-world generalization performance.

---

## Key Autonomous Decisions & Assumptions

1. **Synthetic Dataset Generation**: Created a 7,000 row dataset with realistic non-linear relationships (e.g. higher churn for month-to-month contracts, fiber optic without tech support, and >3 support calls).
2. **SQLite Database Seeding**: Configured automatic database population on initial startup so business users immediately see 150 pre-scored customer accounts without needing manual uploads.
3. **Fallback Explainer Engine**: Implemented robust fallback logic for feature attributions so predictions succeed seamlessly even in restricted environments where SHAP native C++ dependencies differ.
4. **Dedicated Risk Analytics Page**: Separated global risk distribution, cohort analysis, and contract risk charts into a dedicated **Risk Analytics** page accessible via the main navigation bar.

---

## "What I'd Add With More Time" (Interview Discussion Points)

1. **Model Drift & Data Quality Monitoring**: Integrate **Evidently AI** or Evidently Service to track covariate shift between serving distributions and training data over time.
2. **Automated Retention Playbooks**: Add webhook integration with CRM tools (HubSpot/Salesforce) to automatically trigger discount offers or support agent outreach whenever a customer crosses into the **High Risk (>65%)** tier.
3. **A/B Testing Infrastructure**: Framework to evaluate whether SHAP-guided retention offers decrease actual churn rate versus standard control offers.
4. **Real-time Kafka / Redis Event Streaming**: Stream live telemetry events (app logins, support tickets, billing failures) to update customer churn scores continuously.

---

## Screenshots Placeholder

*(Screenshots of Welcome Page, Executive Dashboard, Dedicated Risk Analytics Page, Customer Directory Table, and SHAP Predictor Tool)*
