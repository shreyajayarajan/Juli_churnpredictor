import React from 'react';
import { ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle } from 'lucide-react';

export const ShapWaterfallChart = ({ reasons = [] }) => {
  if (!reasons || reasons.length === 0) {
    return (
      <div className="p-4 text-center text-charcoal-muted text-xs bg-[#F4F1EA] rounded-md border border-cardborder font-sans">
        No feature attributions calculated for this profile.
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-cardborder pb-2">
        <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal flex items-center gap-1.5 font-sans">
          <span>Top 5 SHAP Risk Drivers</span>
        </h4>
        <span className="text-[10px] text-burgundy font-mono font-semibold">Model Explainer</span>
      </div>

      <div className="space-y-2">
        {reasons.map((item, idx) => {
          const isRiskIncrease = item.direction === 'increases_risk' || item.shap_value > 0;
          const barWidth = Math.min(100, Math.max(12, Math.abs(item.shap_value) * 160));

          return (
            <div key={idx} className="p-2.5 rounded-md bg-[#FFFFFF] border border-cardborder flex flex-col gap-1.5 hover:border-burgundy/40 transition-all">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal flex items-center gap-1.5">
                  {isRiskIncrease ? (
                    <AlertCircle className="w-3.5 h-3.5 text-terracotta shrink-0" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5 text-burgundy shrink-0" />
                  )}
                  {item.clean_name || item.feature}
                </span>

                <span className={`font-mono text-xs font-bold flex items-center ${isRiskIncrease ? 'text-terracotta' : 'text-burgundy'}`}>
                  {isRiskIncrease ? '+' : ''}{item.shap_value.toFixed(3)}
                  {isRiskIncrease ? (
                    <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#F4F1EA] h-1.5 rounded flex items-center">
                <div 
                  className={`h-full rounded transition-all duration-300 ${
                    isRiskIncrease ? 'bg-terracotta' : 'bg-burgundy'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-charcoal-muted font-mono">
                <span>Value: {item.feature_value !== undefined ? item.feature_value.toFixed(1) : 'N/A'}</span>
                <span className={isRiskIncrease ? 'text-terracotta font-semibold' : 'text-burgundy font-semibold'}>
                  {isRiskIncrease ? 'Increases Churn Risk' : 'Reduces Churn Risk'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShapWaterfallChart;
