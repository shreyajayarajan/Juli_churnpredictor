import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

try:
    import mlflow
    MLFLOW_AVAILABLE = True
except ImportError:
    MLFLOW_AVAILABLE = False

from data.generate_dataset import generate_telco_churn_dataset
from preprocess import prepare_train_test_data
from explain import ChurnExplainer

def train_and_evaluate_models():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    artifacts_dir = os.path.join(base_dir, "artifacts")
    os.makedirs(artifacts_dir, exist_ok=True)
    
    data_path = os.path.join(base_dir, "data", "telco_churn.csv")
    if not os.path.exists(data_path):
        os.makedirs(os.path.dirname(data_path), exist_ok=True)
        print("Generating synthetic Telco Churn dataset...")
        df = generate_telco_churn_dataset(7000)
        df.to_csv(data_path, index=False)
    else:
        df = pd.read_csv(data_path)
        
    print(f"Loaded dataset with {len(df)} rows.")
    
    # Preprocess & split with SMOTE on train split
    data_dict = prepare_train_test_data(df)
    X_train, y_train = data_dict['X_train'], data_dict['y_train']
    X_val, y_val = data_dict['X_val'], data_dict['y_val']
    X_test, y_test = data_dict['X_test'], data_dict['y_test']
    feature_cols = data_dict['feature_columns']
    scaler = data_dict['scaler']
    
    # Save feature names and scaler
    with open(os.path.join(artifacts_dir, "features.json"), "w") as f:
        json.dump(feature_cols, f)
    joblib.dump(scaler, os.path.join(artifacts_dir, "scaler.pkl"))
    
    if MLFLOW_AVAILABLE:
        mlflow.set_tracking_uri("file://" + os.path.join(base_dir, "mlruns"))
        mlflow.set_experiment("JULI_Customer_Churn")
    
    # 1. Baseline Model: Logistic Regression
    print("\n--- Training Logistic Regression Baseline ---")
    lr = LogisticRegression(max_iter=1000, random_state=42)
    lr.fit(X_train, y_train)
    
    lr_preds = lr.predict(X_test)
    lr_probs = lr.predict_proba(X_test)[:, 1]
    
    lr_metrics = {
        "accuracy": float(accuracy_score(y_test, lr_preds)),
        "precision": float(precision_score(y_test, lr_preds)),
        "recall": float(recall_score(y_test, lr_preds)),
        "f1": float(f1_score(y_test, lr_preds)),
        "roc_auc": float(roc_auc_score(y_test, lr_probs))
    }
    print(f"Logistic Regression Test Metrics: {json.dumps(lr_metrics, indent=2)}")
    
    if MLFLOW_AVAILABLE:
        with mlflow.start_run(run_name="Logistic_Regression_Baseline"):
            mlflow.log_params({"model_type": "LogisticRegression", "max_iter": 1000})
            mlflow.log_metrics(lr_metrics)
        
    # 2. Champion Model: XGBoost Classifier
    print("\n--- Training XGBoost Classifier ---")
    xgb_params = {
        "n_estimators": 150,
        "max_depth": 5,
        "learning_rate": 0.05,
        "subsample": 0.8,
        "colsample_bytree": 0.8,
        "scale_pos_weight": 1.2,
        "eval_metric": "logloss",
        "random_state": 42
    }
    
    xgb = XGBClassifier(**xgb_params)
    xgb.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
    
    xgb_preds = xgb.predict(X_test)
    xgb_probs = xgb.predict_proba(X_test)[:, 1]
    
    xgb_metrics = {
        "accuracy": float(accuracy_score(y_test, xgb_preds)),
        "precision": float(precision_score(y_test, xgb_preds)),
        "recall": float(recall_score(y_test, xgb_preds)),
        "f1": float(f1_score(y_test, xgb_preds)),
        "roc_auc": float(roc_auc_score(y_test, xgb_probs))
    }
    
    print(f"XGBoost Test Metrics: {json.dumps(xgb_metrics, indent=2)}")
    
    if MLFLOW_AVAILABLE:
        with mlflow.start_run(run_name="XGBoost_Champion"):
            mlflow.log_params(xgb_params)
            mlflow.log_metrics(xgb_metrics)
        
    # Save champion model & explainer artifact
    model_path = os.path.join(artifacts_dir, "churn_model.pkl")
    joblib.dump(xgb, model_path)
    
    explainer = ChurnExplainer(xgb, feature_cols)
    explainer_path = os.path.join(artifacts_dir, "explainer.pkl")
    joblib.dump(explainer, explainer_path)
    
    # Save metrics summary file
    metrics_summary = {
        "logistic_regression": lr_metrics,
        "xgboost": xgb_metrics,
        "champion": "xgboost"
    }
    with open(os.path.join(artifacts_dir, "metrics.json"), "w") as f:
        json.dump(metrics_summary, f, indent=2)
        
    print(f"\nSaved champion XGBoost model and SHAP explainer to {artifacts_dir}")
    return metrics_summary

if __name__ == "__main__":
    train_and_evaluate_models()
