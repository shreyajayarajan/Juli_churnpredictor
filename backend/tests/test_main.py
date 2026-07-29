import os
import sys
import pytest
from fastapi.testclient import TestClient

# Ensure app package is importable
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "JULI Backend API" in data["service"]

def test_dashboard_summary():
    response = client.get("/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_customers" in data
    assert "high_risk_count" in data
    assert "revenue_at_risk" in data
    assert data["total_customers"] >= 0

def test_risk_distribution():
    response = client.get("/analytics/risk-distribution")
    assert response.status_code == 200
    data = response.json()
    assert "distribution" in data
    assert "top_global_drivers" in data
    assert "churn_by_contract" in data

def test_customers_pagination():
    response = client.get("/customers?page=1&page_size=5")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "customers" in data
    assert len(data["customers"]) <= 5

def test_predict_endpoint():
    payload = {
        "customerID": "TEST-9999",
        "gender": "Female",
        "SeniorCitizen": 0,
        "Partner": "No",
        "Dependents": "No",
        "tenure": 2,
        "PhoneService": "Yes",
        "MultipleLines": "No",
        "InternetService": "Fiber optic",
        "OnlineSecurity": "No",
        "OnlineBackup": "No",
        "DeviceProtection": "No",
        "TechSupport": "No",
        "StreamingTV": "Yes",
        "StreamingMovies": "Yes",
        "Contract": "Month-to-month",
        "PaperlessBilling": "Yes",
        "PaymentMethod": "Electronic check",
        "MonthlyCharges": 95.50,
        "TotalCharges": 191.00,
        "SupportCalls": 4
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "churn_probability" in data
    assert 0.0 <= data["churn_probability"] <= 1.0
    assert data["risk_tier"] in ["Low", "Medium", "High"]
    assert "top_reasons" in data
    assert len(data["top_reasons"]) > 0
