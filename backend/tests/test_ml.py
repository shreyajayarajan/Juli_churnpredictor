import os
import sys
import pytest
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ML_DIR = os.path.join(BASE_DIR, "ml")
if ML_DIR not in sys.path:
    sys.path.append(ML_DIR)

from data.generate_dataset import generate_telco_churn_dataset
from preprocess import preprocess_dataframe, prepare_train_test_data

def test_data_generation():
    df = generate_telco_churn_dataset(num_samples=100, seed=123)
    assert len(df) == 100
    assert "Churn" in df.columns
    assert "tenure" in df.columns
    assert "MonthlyCharges" in df.columns

def test_preprocessing_pipeline():
    df = generate_telco_churn_dataset(num_samples=100, seed=456)
    data_dict = prepare_train_test_data(df, test_size=0.2, val_size=0.1)
    
    assert "X_train" in data_dict
    assert "y_train" in data_dict
    assert "X_test" in data_dict
    assert "y_test" in data_dict
    assert len(data_dict["feature_columns"]) > 0
    assert data_dict["scaler"] is not None
