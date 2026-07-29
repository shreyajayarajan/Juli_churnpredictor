import os
import numpy as np
import pandas as pd

def generate_telco_churn_dataset(num_samples: int = 7000, seed: int = 42) -> pd.DataFrame:
    """
    Generates a realistic synthetic Telco Customer Churn dataset (~7000 rows).
    Matches the standard Kaggle Telco Churn dataset schema with correlated churn logic.
    """
    np.random.seed(seed)
    
    customer_ids = [f"{np.random.randint(1000, 9999)}-{np.random.choice(list('ABCDEFGHIJKLMNOPQRSTUVWXYZ'))}{np.random.choice(list('ABCDEFGHIJKLMNOPQRSTUVWXYZ'))}{np.random.choice(list('ABCDEFGHIJKLMNOPQRSTUVWXYZ'))}" for _ in range(num_samples)]
    
    gender = np.random.choice(['Female', 'Male'], size=num_samples)
    senior_citizen = np.random.choice([0, 1], size=num_samples, p=[0.84, 0.16])
    partner = np.random.choice(['Yes', 'No'], size=num_samples, p=[0.48, 0.52])
    dependents = np.random.choice(['Yes', 'No'], size=num_samples, p=[0.30, 0.70])
    
    # Tenure in months (1 to 72)
    tenure = np.random.exponential(scale=25, size=num_samples).astype(int) + 1
    tenure = np.clip(tenure, 1, 72)
    
    phone_service = np.random.choice(['Yes', 'No'], size=num_samples, p=[0.90, 0.10])
    
    # Multiple lines depends on phone service
    multiple_lines = []
    for ps in phone_service:
        if ps == 'No':
            multiple_lines.append('No phone service')
        else:
            multiple_lines.append(np.random.choice(['Yes', 'No'], p=[0.45, 0.55]))
            
    internet_service = np.random.choice(['DSL', 'Fiber optic', 'No'], size=num_samples, p=[0.35, 0.44, 0.21])
    
    online_security = []
    online_backup = []
    device_protection = []
    tech_support = []
    streaming_tv = []
    streaming_movies = []
    
    for net in internet_service:
        if net == 'No':
            online_security.append('No internet service')
            online_backup.append('No internet service')
            device_protection.append('No internet service')
            tech_support.append('No internet service')
            streaming_tv.append('No internet service')
            streaming_movies.append('No internet service')
        else:
            online_security.append(np.random.choice(['Yes', 'No'], p=[0.30, 0.70]))
            online_backup.append(np.random.choice(['Yes', 'No'], p=[0.35, 0.65]))
            device_protection.append(np.random.choice(['Yes', 'No'], p=[0.35, 0.65]))
            tech_support.append(np.random.choice(['Yes', 'No'], p=[0.30, 0.70]))
            streaming_tv.append(np.random.choice(['Yes', 'No'], p=[0.40, 0.60]))
            streaming_movies.append(np.random.choice(['Yes', 'No'], p=[0.40, 0.60]))
            
    contract = np.random.choice(['Month-to-month', 'One year', 'Two year'], size=num_samples, p=[0.55, 0.24, 0.21])
    paperless_billing = np.random.choice(['Yes', 'No'], size=num_samples, p=[0.60, 0.40])
    payment_method = np.random.choice([
        'Electronic check', 'Mailed check', 'Bank transfer (automatic)', 'Credit card (automatic)'
    ], size=num_samples, p=[0.34, 0.23, 0.21, 0.22])
    
    # Support calls (0 to 10)
    support_calls = np.random.poisson(lam=2.1, size=num_samples)
    
    # Monthly charges calculation based on features
    base_charge = 20.0
    monthly_charges = np.zeros(num_samples)
    for i in range(num_samples):
        chg = base_charge
        if phone_service[i] == 'Yes': chg += 20
        if multiple_lines[i] == 'Yes': chg += 10
        if internet_service[i] == 'DSL': chg += 25
        elif internet_service[i] == 'Fiber optic': chg += 45
        if online_security[i] == 'Yes': chg += 10
        if online_backup[i] == 'Yes': chg += 10
        if device_protection[i] == 'Yes': chg += 10
        if tech_support[i] == 'Yes': chg += 10
        if streaming_tv[i] == 'Yes': chg += 12
        if streaming_movies[i] == 'Yes': chg += 12
        chg += np.random.uniform(-3, 3)
        monthly_charges[i] = round(max(chg, 18.5), 2)
        
    total_charges = np.round(monthly_charges * tenure + np.random.uniform(-15, 15, size=num_samples), 2)
    total_charges = np.clip(total_charges, 18.5, None)
    
    # Logistic formula to generate realistic Churn probability (~26% churn)
    # Higher risk drivers: Month-to-month, Fiber optic, No tech support, high support calls, low tenure, Electronic check
    log_odds = -1.5 \
        - 0.05 * (tenure - 20) \
        + 1.2 * (contract == 'Month-to-month') \
        - 0.9 * (contract == 'Two year') \
        + 0.7 * (internet_service == 'Fiber optic') \
        - 0.5 * (np.array(tech_support) == 'Yes') \
        - 0.4 * (np.array(online_security) == 'Yes') \
        + 0.35 * (support_calls - 2) \
        + 0.4 * (payment_method == 'Electronic check') \
        + 0.01 * (monthly_charges - 65) \
        + np.random.normal(0, 0.4, size=num_samples)
        
    prob = 1.0 / (1.0 + np.exp(-log_odds))
    churn = np.where(prob > 0.48, 'Yes', 'No')
    
    df = pd.DataFrame({
        'customerID': customer_ids,
        'gender': gender,
        'SeniorCitizen': senior_citizen,
        'Partner': partner,
        'Dependents': dependents,
        'tenure': tenure,
        'PhoneService': phone_service,
        'MultipleLines': multiple_lines,
        'InternetService': internet_service,
        'OnlineSecurity': online_security,
        'OnlineBackup': online_backup,
        'DeviceProtection': device_protection,
        'TechSupport': tech_support,
        'StreamingTV': streaming_tv,
        'StreamingMovies': streaming_movies,
        'Contract': contract,
        'PaperlessBilling': paperless_billing,
        'PaymentMethod': payment_method,
        'MonthlyCharges': monthly_charges,
        'TotalCharges': total_charges,
        'SupportCalls': support_calls,
        'Churn': churn
    })
    
    return df

if __name__ == "__main__":
    out_dir = os.path.dirname(os.path.abspath(__file__))
    df = generate_telco_churn_dataset(7000)
    csv_path = os.path.join(out_dir, "telco_churn.csv")
    df.to_csv(csv_path, index=False)
    print(f"Generated {len(df)} customer records to {csv_path}. Churn rate: {(df['Churn'] == 'Yes').mean():.1%}")
