import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

try:
    from imblearn.over_sampling import SMOTE
    SMOTE_AVAILABLE = True
except Exception:
    SMOTE_AVAILABLE = False

try:
    from imblearn.over_sampling import RandomOverSampler
    ROS_AVAILABLE = True
except Exception:
    ROS_AVAILABLE = False

NUMERICAL_FEATURES = ['tenure', 'MonthlyCharges', 'TotalCharges', 'SupportCalls']
CATEGORICAL_FEATURES = [
    'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService',
    'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup',
    'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies',
    'Contract', 'PaperlessBilling', 'PaymentMethod'
]

def preprocess_dataframe(df: pd.DataFrame, is_training: bool = True, feature_columns: list = None, scaler: StandardScaler = None):
    """
    Preprocesses raw Telco Churn dataframe:
    - Converts TotalCharges to numeric handling any blanks
    - One-Hot encodes categorical features
    - Scales numerical features with StandardScaler
    """
    df = df.copy()
    
    # Clean TotalCharges if object/string
    if 'TotalCharges' in df.columns and df['TotalCharges'].dtype == object:
        df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].astype(str).str.strip(), errors='coerce')
        df['TotalCharges'] = df['TotalCharges'].fillna(df['tenure'] * df['MonthlyCharges'])

    # Separate target if present
    y = None
    if 'Churn' in df.columns:
        y = (df['Churn'].astype(str).str.strip().str.lower() == 'yes').astype(int)
        df_features = df.drop(columns=['Churn'])
    else:
        df_features = df.copy()
        
    if 'customerID' in df_features.columns:
        df_features = df_features.drop(columns=['customerID'])
        
    # One-hot encoding
    df_encoded = pd.get_dummies(df_features, columns=[col for col in CATEGORICAL_FEATURES if col in df_features.columns], drop_first=True)
    
    if is_training:
        final_cols = df_encoded.columns.tolist()
        scaler = StandardScaler()
        num_cols = [c for c in NUMERICAL_FEATURES if c in df_encoded.columns]
        df_encoded[num_cols] = scaler.fit_transform(df_encoded[num_cols])
        return df_encoded, y, final_cols, scaler
    else:
        for col in feature_columns:
            if col not in df_encoded.columns:
                df_encoded[col] = 0
        df_encoded = df_encoded[feature_columns]
        
        num_cols = [c for c in NUMERICAL_FEATURES if c in df_encoded.columns]
        if scaler is not None:
            df_encoded[num_cols] = scaler.transform(df_encoded[num_cols])
            
        return df_encoded, y

def prepare_train_test_data(df: pd.DataFrame, test_size: float = 0.2, val_size: float = 0.1, random_state: int = 42):
    """
    Splits into stratified Train/Val/Test and applies SMOTE/Oversampling ONLY on training split.
    """
    X_encoded, y, feature_cols, scaler = preprocess_dataframe(df, is_training=True)
    
    # Train / Test split
    X_train_val, X_test, y_train_val, y_test = train_test_split(
        X_encoded, y, test_size=test_size, stratify=y, random_state=random_state
    )
    
    # Train / Val split
    val_ratio_relative = val_size / (1.0 - test_size)
    X_train, X_val, y_train, y_val = train_test_split(
        X_train_val, y_train_val, test_size=val_ratio_relative, stratify=y_train_val, random_state=random_state
    )
    
    # Apply SMOTE or RandomOverSampler or manual duplication only on train set
    if SMOTE_AVAILABLE:
        try:
            sampler = SMOTE(random_state=random_state)
            X_train_res, y_train_res = sampler.fit_resample(X_train, y_train)
        except Exception:
            X_train_res, y_train_res = _manual_oversample(X_train, y_train, random_state)
    elif ROS_AVAILABLE:
        try:
            sampler = RandomOverSampler(random_state=random_state)
            X_train_res, y_train_res = sampler.fit_resample(X_train, y_train)
        except Exception:
            X_train_res, y_train_res = _manual_oversample(X_train, y_train, random_state)
    else:
        X_train_res, y_train_res = _manual_oversample(X_train, y_train, random_state)
        
    return {
        'X_train': X_train_res,
        'y_train': y_train_res,
        'X_val': X_val,
        'y_val': y_val,
        'X_test': X_test,
        'y_test': y_test,
        'feature_columns': feature_cols,
        'scaler': scaler
    }

def _manual_oversample(X, y, random_state=42):
    """Fallback manual oversampler if imblearn is incompatible with current scikit-learn version."""
    np.random.seed(random_state)
    minority_idx = np.where(y == 1)[0]
    majority_idx = np.where(y == 0)[0]
    
    n_minority = len(minority_idx)
    n_majority = len(majority_idx)
    
    if n_minority == 0 or n_majority == 0 or n_minority >= n_majority:
        return X, y
        
    oversampled_minority_idx = np.random.choice(minority_idx, size=n_majority, replace=True)
    all_idx = np.concatenate([majority_idx, oversampled_minority_idx])
    np.random.shuffle(all_idx)
    
    if isinstance(X, pd.DataFrame):
        return X.iloc[all_idx], y.iloc[all_idx]
    else:
        return X[all_idx], y[all_idx]
