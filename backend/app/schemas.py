from pydantic import BaseModel, Field
from typing import List, Optional

class CustomerInput(BaseModel):
    customerID: Optional[str] = "NEW-1001"
    gender: str = Field(..., example="Female")
    SeniorCitizen: int = Field(0, example=0)
    Partner: str = Field("No", example="Yes")
    Dependents: str = Field("No", example="No")
    tenure: int = Field(..., ge=0, le=100, example=12)
    PhoneService: str = Field("Yes", example="Yes")
    MultipleLines: str = Field("No", example="No")
    InternetService: str = Field(..., example="Fiber optic")
    OnlineSecurity: str = Field("No", example="No")
    OnlineBackup: str = Field("No", example="Yes")
    DeviceProtection: str = Field("No", example="No")
    TechSupport: str = Field("No", example="No")
    StreamingTV: str = Field("No", example="Yes")
    StreamingMovies: str = Field("No", example="Yes")
    Contract: str = Field(..., example="Month-to-month")
    PaperlessBilling: str = Field("Yes", example="Yes")
    PaymentMethod: str = Field(..., example="Electronic check")
    MonthlyCharges: float = Field(..., ge=0, example=85.50)
    TotalCharges: float = Field(..., ge=0, example=1026.00)
    SupportCalls: int = Field(0, ge=0, example=3)

class ShapReason(BaseModel):
    feature: str
    clean_name: str
    shap_value: float
    abs_shap: float
    direction: str
    feature_value: float

class PredictionResponse(BaseModel):
    customer_id: str
    churn_probability: float
    predicted_churn: int
    risk_tier: str # Low, Medium, High
    top_reasons: List[ShapReason]

class CustomerOut(BaseModel):
    id: str
    gender: str
    senior_citizen: int
    partner: str
    dependents: str
    tenure: int
    phone_service: str
    multiple_lines: str
    internet_service: str
    online_security: str
    online_backup: str
    device_protection: str
    tech_support: str
    streaming_tv: str
    streaming_movies: str
    contract: str
    paperless_billing: str
    payment_method: str
    monthly_charges: float
    total_charges: float
    support_calls: int
    churn_probability: float
    risk_tier: str
    predicted_churn: int
    actual_churn: Optional[str]

    class Config:
        orm_mode = True

class CustomerListResponse(BaseModel):
    total: int
    page: int
    page_size: int
    total_pages: int
    customers: List[CustomerOut]

class DashboardSummary(BaseModel):
    total_customers: int
    high_risk_count: int
    medium_risk_count: int
    low_risk_count: int
    high_risk_pct: float
    avg_churn_probability: float
    revenue_at_risk: float
    model_accuracy: float

class RiskDistributionItem(BaseModel):
    tier: str
    count: int
    percentage: float

class FeatureImportanceItem(BaseModel):
    feature: str
    importance: float

class RiskDistributionResponse(BaseModel):
    distribution: List[RiskDistributionItem]
    top_global_drivers: List[FeatureImportanceItem]
    churn_by_contract: dict
    churn_by_internet: dict
    churn_by_tenure: dict
