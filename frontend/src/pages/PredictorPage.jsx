import React, { useState } from 'react';
import { Sparkles, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import RiskGauge from '../components/RiskGauge';
import ShapWaterfallChart from '../components/ShapWaterfallChart';

export const PredictorPage = ({ onPredict, isPredicting }) => {
  const [formData, setFormData] = useState({
    customerID: "PRED-" + Math.floor(1000 + Math.random() * 9000),
    gender: "Female",
    SeniorCitizen: 0,
    Partner: "No",
    Dependents: "No",
    tenure: 6,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "Yes",
    StreamingMovies: "Yes",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 85.50,
    TotalCharges: 513.00,
    SupportCalls: 4
  });

  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentInput = {
      ...formData,
      customerID: "PRED-" + Math.floor(1000 + Math.random() * 9000)
    };
    const res = await onPredict(currentInput);
    if (res) {
      setPredictionResult(res);
    }
  };

  const loadPresetHighRisk = () => {
    const highRiskProfile = {
      customerID: "SIM-HIGH-99",
      gender: "Male",
      SeniorCitizen: 1,
      Partner: "No",
      Dependents: "No",
      tenure: 2,
      PhoneService: "Yes",
      MultipleLines: "Yes",
      InternetService: "Fiber optic",
      OnlineSecurity: "No",
      OnlineBackup: "No",
      DeviceProtection: "No",
      TechSupport: "No",
      StreamingTV: "Yes",
      StreamingMovies: "Yes",
      Contract: "Month-to-month",
      PaperlessBilling: "Yes",
      PaymentMethod: "Electronic check",
      MonthlyCharges: 98.40,
      TotalCharges: 196.80,
      SupportCalls: 5
    };
    setFormData(highRiskProfile);
    setPredictionResult(null);
  };

  const loadPresetLowRisk = () => {
    const lowRiskProfile = {
      customerID: "SIM-LOW-01",
      gender: "Female",
      SeniorCitizen: 0,
      Partner: "Yes",
      Dependents: "Yes",
      tenure: 48,
      PhoneService: "Yes",
      MultipleLines: "No",
      InternetService: "DSL",
      OnlineSecurity: "Yes",
      OnlineBackup: "Yes",
      DeviceProtection: "Yes",
      TechSupport: "Yes",
      StreamingTV: "No",
      StreamingMovies: "No",
      Contract: "Two year",
      PaperlessBilling: "No",
      PaymentMethod: "Bank transfer (automatic)",
      MonthlyCharges: 54.20,
      TotalCharges: 2601.60,
      SupportCalls: 0
    };
    setFormData(lowRiskProfile);
    setPredictionResult(null);
  };

  return (
    <div className="space-y-6 pb-10 font-sans">
      {/* Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cardborder pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-burgundy-light text-burgundy text-[11px] font-semibold uppercase tracking-wider mb-1 font-sans">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Risk Sandbox</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-cursive tracking-wide">Real-time Churn Predictor</h2>
          <p className="text-charcoal-muted text-xs font-sans">Input customer parameters to calculate instant risk scoring and SHAP attributions.</p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 font-sans">
          <button
            type="button"
            onClick={loadPresetHighRisk}
            className="px-3 py-1 rounded bg-terracotta-light hover:bg-terracotta/20 text-terracotta border border-terracotta/30 text-xs font-semibold transition-all flex items-center gap-1"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>High Risk Preset</span>
          </button>
          <button
            type="button"
            onClick={loadPresetLowRisk}
            className="px-3 py-1 rounded bg-burgundy-light hover:bg-burgundy/20 text-burgundy border border-burgundy/30 text-xs font-semibold transition-all flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Low Risk Preset</span>
          </button>
        </div>
      </div>

      {/* Grid: Form + Live Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Input Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 juli-card rounded-lg p-5 border border-cardborder space-y-4 bg-white">
          <h3 className="text-sm font-bold text-charcoal font-sans border-b border-cardborder pb-2">Customer Profile Parameters</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            
            <div>
              <label className="block text-charcoal font-semibold mb-1">Tenure (Months)</label>
              <input
                type="number"
                name="tenure"
                min="0"
                max="72"
                value={formData.tenure}
                onChange={handleChange}
                className="w-full bg-[#F4F1EA] border border-cardborder rounded px-3 py-1.5 text-charcoal focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-1">Contract Type</label>
              <select
                name="Contract"
                value={formData.Contract}
                onChange={handleChange}
                className="w-full bg-[#F4F1EA] border border-cardborder rounded px-3 py-1.5 text-charcoal focus:outline-none"
              >
                <option value="Month-to-month">Month-to-month</option>
                <option value="One year">One year</option>
                <option value="Two year">Two year</option>
              </select>
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-1">Internet Service</label>
              <select
                name="InternetService"
                value={formData.InternetService}
                onChange={handleChange}
                className="w-full bg-[#F4F1EA] border border-cardborder rounded px-3 py-1.5 text-charcoal focus:outline-none"
              >
                <option value="Fiber optic">Fiber optic</option>
                <option value="DSL">DSL</option>
                <option value="No">No Internet</option>
              </select>
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-1">Customer Support Calls</label>
              <input
                type="number"
                name="SupportCalls"
                min="0"
                max="15"
                value={formData.SupportCalls}
                onChange={handleChange}
                className="w-full bg-[#F4F1EA] border border-cardborder rounded px-3 py-1.5 text-charcoal focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-1">Monthly Charges ($)</label>
              <input
                type="number"
                step="0.01"
                name="MonthlyCharges"
                value={formData.MonthlyCharges}
                onChange={handleChange}
                className="w-full bg-[#F4F1EA] border border-cardborder rounded px-3 py-1.5 text-charcoal focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-1">Payment Method</label>
              <select
                name="PaymentMethod"
                value={formData.PaymentMethod}
                onChange={handleChange}
                className="w-full bg-[#F4F1EA] border border-cardborder rounded px-3 py-1.5 text-charcoal focus:outline-none"
              >
                <option value="Electronic check">Electronic check</option>
                <option value="Credit card (automatic)">Credit card (automatic)</option>
                <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                <option value="Mailed check">Mailed check</option>
              </select>
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-1">Tech Support</label>
              <select
                name="TechSupport"
                value={formData.TechSupport}
                onChange={handleChange}
                className="w-full bg-[#F4F1EA] border border-cardborder rounded px-3 py-1.5 text-charcoal focus:outline-none"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-1">Online Security</label>
              <select
                name="OnlineSecurity"
                value={formData.OnlineSecurity}
                onChange={handleChange}
                className="w-full bg-[#F4F1EA] border border-cardborder rounded px-3 py-1.5 text-charcoal focus:outline-none"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="No internet service">No internet service</option>
              </select>
            </div>

          </div>

          <div className="pt-2 border-t border-cardborder flex justify-end font-sans">
            <button
              type="submit"
              disabled={isPredicting}
              className="px-5 py-2.5 rounded bg-burgundy hover:bg-burgundy-hover text-white font-bold text-xs shadow transition-all flex items-center gap-2 border border-burgundy/30"
            >
              {isPredicting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Computing Prediction...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Predict Churn Risk</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Right: Live SHAP Prediction Result Output */}
        <div className="lg:col-span-5 space-y-4 font-sans">
          <div className="juli-card rounded-lg p-5 border border-cardborder space-y-4 bg-white">
            <h3 className="text-sm font-bold text-charcoal font-sans border-b border-cardborder pb-2 flex items-center justify-between">
              <span>Prediction Diagnostics</span>
              {predictionResult && (
                <span className="text-[10px] text-burgundy font-mono font-semibold">Logged to DB</span>
              )}
            </h3>

            {predictionResult ? (
              <div className="space-y-5 animate-fadeIn">
                <RiskGauge 
                  score={predictionResult.churn_probability} 
                  tier={predictionResult.risk_tier} 
                />

                <ShapWaterfallChart reasons={predictionResult.top_reasons} />
              </div>
            ) : (
              <div className="py-14 text-center text-charcoal-muted space-y-2 font-sans">
                <Sparkles className="w-8 h-8 text-burgundy mx-auto opacity-40" />
                <p className="text-xs font-medium">Click "Predict Churn Risk" to compute model scoring and SHAP attributions.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PredictorPage;
