from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from .database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True, index=True)
    gender = Column(String)
    senior_citizen = Column(Integer)
    partner = Column(String)
    dependents = Column(String)
    tenure = Column(Integer)
    phone_service = Column(String)
    multiple_lines = Column(String)
    internet_service = Column(String)
    online_security = Column(String)
    online_backup = Column(String)
    device_protection = Column(String)
    tech_support = Column(String)
    streaming_tv = Column(String)
    streaming_movies = Column(String)
    contract = Column(String)
    paperless_billing = Column(String)
    payment_method = Column(String)
    monthly_charges = Column(Float)
    total_charges = Column(Float)
    support_calls = Column(Integer)
    
    # Pre-calculated scoring attributes
    churn_probability = Column(Float, index=True)
    risk_tier = Column(String, index=True)  # Low, Medium, High
    predicted_churn = Column(Integer)  # 0 or 1
    actual_churn = Column(String, nullable=True) # Yes or No

class PredictionLog(Base):
    __tablename__ = "prediction_logs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    customer_id = Column(String, index=True, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    input_data = Column(Text)  # JSON string of inputs
    churn_probability = Column(Float)
    risk_tier = Column(String)
    top_reasons = Column(Text)  # JSON string of top SHAP reasons
