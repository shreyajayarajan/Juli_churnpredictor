import numpy as np
import pandas as pd

SHAP_AVAILABLE = False
try:
    import shap
    SHAP_AVAILABLE = True
except Exception:
    SHAP_AVAILABLE = False

class ChurnExplainer:
    def __init__(self, model, feature_names):
        self.model = model
        self.feature_names = feature_names
        self.use_shap = False
        if SHAP_AVAILABLE:
            try:
                self.explainer = shap.TreeExplainer(model)
                self.use_shap = True
            except Exception:
                self.use_shap = False
        
    def explain_instance(self, processed_row_df, top_k=5):
        """
        Calculates feature attributions for a single customer row.
        Uses SHAP if available; falls back to Tree gain * normalized feature value contribution.
        """
        row_vals = processed_row_df.iloc[0].values if isinstance(processed_row_df, pd.DataFrame) else processed_row_df[0]
        
        if self.use_shap:
            try:
                shap_values = self.explainer.shap_values(processed_row_df)
                if isinstance(shap_values, list):
                    sv = shap_values[1][0] if len(shap_values) > 1 else shap_values[0][0]
                elif len(shap_values.shape) == 2:
                    sv = shap_values[0]
                else:
                    sv = shap_values
                return self._format_reasons(sv, row_vals, top_k)
            except Exception:
                pass

        # Fallback feature importance calculation based on XGBoost feature importances & values
        try:
            importances = getattr(self.model, "feature_importances_", np.ones(len(self.feature_names)))
        except Exception:
            importances = np.ones(len(self.feature_names))

        # Calculate directional contribution: row_val * feature_importance
        contributions = row_vals * importances
        return self._format_reasons(contributions, row_vals, top_k)

    def _format_reasons(self, scores, row_vals, top_k=5):
        reasons = []
        for feat_name, score, feat_val in zip(self.feature_names, scores, row_vals):
            reasons.append({
                "feature": feat_name,
                "clean_name": self._format_feature_name(feat_name),
                "shap_value": float(score),
                "abs_shap": abs(float(score)),
                "direction": "increases_risk" if score > 0 else "decreases_risk",
                "feature_value": float(feat_val)
            })
            
        reasons.sort(key=lambda x: x["abs_shap"], reverse=True)
        return reasons[:top_k]

    def _format_feature_name(self, name: str) -> str:
        name_map = {
            "tenure": "Account Tenure (Months)",
            "MonthlyCharges": "Monthly Bill ($)",
            "TotalCharges": "Lifetime Charges ($)",
            "SupportCalls": "Customer Support Calls",
            "Contract_One year": "Contract: 1-Year",
            "Contract_Two year": "Contract: 2-Year",
            "InternetService_Fiber optic": "Internet: Fiber Optic",
            "InternetService_No": "Internet: None",
            "PaymentMethod_Electronic check": "Payment: Electronic Check",
            "PaymentMethod_Credit card (automatic)": "Payment: Credit Card",
            "PaymentMethod_Mailed check": "Payment: Mailed Check",
            "TechSupport_Yes": "Tech Support: Enrolled",
            "TechSupport_No internet service": "Tech Support: No Internet",
            "OnlineSecurity_Yes": "Online Security: Enrolled",
            "OnlineSecurity_No internet service": "Online Security: No Internet",
            "PaperlessBilling_Yes": "Paperless Billing: Enabled",
            "SeniorCitizen": "Senior Citizen",
            "Partner_Yes": "Has Partner",
            "Dependents_Yes": "Has Dependents"
        }
        return name_map.get(name, name.replace("_", ": "))
