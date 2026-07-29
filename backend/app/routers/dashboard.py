from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import DashboardSummary, RiskDistributionResponse
from ..crud import get_dashboard_summary, get_risk_distribution_data

router = APIRouter(tags=["Dashboard & Analytics"])

@router.get("/dashboard/summary", response_model=DashboardSummary)
def get_summary(db: Session = Depends(get_db)):
    """Returns high-level KPI dashboard metrics."""
    return get_dashboard_summary(db)

@router.get("/analytics/risk-distribution", response_model=RiskDistributionResponse)
def get_risk_analytics(db: Session = Depends(get_db)):
    """Returns detailed risk distribution breakdowns and global feature importances."""
    return get_risk_distribution_data(db)
