from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import CustomerListResponse, CustomerOut
from ..crud import get_customers_paginated, get_customer_by_id

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.get("", response_model=CustomerListResponse)
def list_customers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: str = Query(None),
    risk_tier: str = Query(None),
    contract: str = Query(None),
    sort_by: str = Query("churn_probability"),
    order: str = Query("desc"),
    db: Session = Depends(get_db)
):
    """Returns paginated, searchable, filterable list of customers."""
    data = get_customers_paginated(
        db=db,
        page=page,
        page_size=page_size,
        search=search,
        risk_tier=risk_tier,
        contract=contract,
        sort_by=sort_by,
        order=order
    )
    
    # Map model objects to schema dicts
    customer_list = []
    for c in data["customers"]:
        customer_list.append({
            "id": c.id,
            "gender": c.gender,
            "senior_citizen": c.senior_citizen,
            "partner": c.partner,
            "dependents": c.dependents,
            "tenure": c.tenure,
            "phone_service": c.phone_service,
            "multiple_lines": c.multiple_lines,
            "internet_service": c.internet_service,
            "online_security": c.online_security,
            "online_backup": c.online_backup,
            "device_protection": c.device_protection,
            "tech_support": c.tech_support,
            "streaming_tv": c.streaming_tv,
            "streaming_movies": c.streaming_movies,
            "contract": c.contract,
            "paperless_billing": c.paperless_billing,
            "payment_method": c.payment_method,
            "monthly_charges": c.monthly_charges,
            "total_charges": c.total_charges,
            "support_calls": c.support_calls,
            "churn_probability": c.churn_probability,
            "risk_tier": c.risk_tier,
            "predicted_churn": c.predicted_churn,
            "actual_churn": c.actual_churn
        })
        
    return {
        "total": data["total"],
        "page": data["page"],
        "page_size": data["page_size"],
        "total_pages": data["total_pages"],
        "customers": customer_list
    }

@router.get("/{customer_id}")
def get_customer(customer_id: str, db: Session = Depends(get_db)):
    """Returns detailed customer profile with SHAP waterfall explanation."""
    res = get_customer_by_id(db, customer_id)
    if not res:
        raise HTTPException(status_code=404, detail="Customer not found")
        
    c = res["customer"]
    cust_out = {
        "id": c.id,
        "gender": c.gender,
        "senior_citizen": c.senior_citizen,
        "partner": c.partner,
        "dependents": c.dependents,
        "tenure": c.tenure,
        "phone_service": c.phone_service,
        "multiple_lines": c.multiple_lines,
        "internet_service": c.internet_service,
        "online_security": c.online_security,
        "online_backup": c.online_backup,
        "device_protection": c.device_protection,
        "tech_support": c.tech_support,
        "streaming_tv": c.streaming_tv,
        "streaming_movies": c.streaming_movies,
        "contract": c.contract,
        "paperless_billing": c.paperless_billing,
        "payment_method": c.payment_method,
        "monthly_charges": c.monthly_charges,
        "total_charges": c.total_charges,
        "support_calls": c.support_calls,
        "churn_probability": c.churn_probability,
        "risk_tier": c.risk_tier,
        "predicted_churn": c.predicted_churn,
        "actual_churn": c.actual_churn
    }
    
    return {
        "customer": cust_out,
        "explanation": res["explanation"]
    }
