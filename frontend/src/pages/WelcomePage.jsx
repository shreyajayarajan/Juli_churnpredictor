import React from 'react';
import TulipLogo from '../components/TulipLogo';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const WelcomePage = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 pb-10 font-sans">
      {/* Main Editorial Welcome Panel */}
      <div className="juli-card rounded-lg p-6 lg:p-10 bg-white border border-cardborder shadow-sm">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-burgundy-light border border-burgundy/20 text-burgundy text-xs font-semibold tracking-wider">
            <TulipLogo size={20} />
            <span className="font-cursive text-xl lowercase font-bold tracking-wide text-burgundy">Juli Intelligence</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-charcoal tracking-tight leading-tight">
            Customer Retention & Churn Prediction <br />
            <span className="text-burgundy font-serif font-bold">Powered by Explainable AI</span>
          </h1>

          <p className="text-charcoal-muted text-sm lg:text-base leading-relaxed">
            Welcome to <strong className="font-cursive text-2xl text-burgundy font-bold">Juli</strong>, your enterprise customer retention management platform. 
            Leveraging XGBoost, SMOTE balanced sampling, and SHAP explainability, Juli provides 
            predictive insights so retention teams can address high-risk subscribers before cancellation occurs.
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('overview')}
              className="px-6 py-3 rounded bg-burgundy hover:bg-burgundy-hover text-white font-semibold text-xs shadow transition-all flex items-center gap-2 border border-burgundy/30"
            >
              <span>Go to Executive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('predictor')}
              className="px-6 py-3 rounded bg-[#F4F1EA] hover:bg-[#E8E5DF] text-charcoal font-semibold text-xs border border-cardborder transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-burgundy" />
              <span>Launch Risk Predictor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Technical Architecture Bar */}
      <div className="juli-card rounded-lg p-5 border border-cardborder space-y-3 bg-white">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted flex items-center gap-1.5 font-sans">
          <ShieldCheck className="w-4 h-4 text-burgundy" />
          <span>Core System Architecture & Engine</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded bg-[#F4F1EA] border border-cardborder">
            <span className="text-charcoal-muted block text-[10px]">Machine Learning Model</span>
            <span className="text-charcoal font-bold">XGBoost Classifier</span>
          </div>
          <div className="p-3 rounded bg-[#F4F1EA] border border-cardborder">
            <span className="text-charcoal-muted block text-[10px]">Class Balancing</span>
            <span className="text-burgundy font-bold">SMOTE (Train Split)</span>
          </div>
          <div className="p-3 rounded bg-[#F4F1EA] border border-cardborder">
            <span className="text-charcoal-muted block text-[10px]">Model Explainability</span>
            <span className="text-charcoal font-bold">SHAP TreeExplainer</span>
          </div>
          <div className="p-3 rounded bg-[#F4F1EA] border border-cardborder">
            <span className="text-charcoal-muted block text-[10px]">Backend Server</span>
            <span className="text-burgundy font-bold">FastAPI + Uvicorn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
