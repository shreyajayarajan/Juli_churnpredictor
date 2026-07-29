from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import CustomerInput, PredictionResponse
from ..services.ml_service import ml_service
from ..crud import log_prediction_to_db

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("", response_model=PredictionResponse)
def predict_churn(input_data: CustomerInput, db: Session = Depends(get_db)):
    """
    Predicts customer churn probability, calculates risk tier, extracts top 5 SHAP drivers,
    and logs the request to the database.
    """
    input_dict = input_data.dict()
    customer_id = input_dict.get("customerID") or "GUEST-PRED"
    
    try:
        result = ml_service.predict_customer(input_dict)
        
        # Log prediction to prediction_logs table
        log_prediction_to_db(
            db=db,
            customer_id=customer_id,
            input_dict=input_dict,
            prob=result["churn_probability"],
            risk_tier=result["risk_tier"],
            top_reasons=result["top_reasons"]
        )
        
        return {
            "customer_id": customer_id,
            "churn_probability": result["churn_probability"],
            "predicted_churn": result["predicted_churn"],
            "risk_tier": result["risk_tier"],
            "top_reasons": result["top_reasons"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
