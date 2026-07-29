import React from 'react';

export const RiskGauge = ({ score = 0, tier = "Low" }) => {
  const percentage = Math.round(score * 100);
  
  let strokeColor = "#800020"; // Burgundy
  let badgeClass = "badge-low";
  
  if (percentage >= 65) {
    strokeColor = "#A52A2A"; // Terracotta Red
    badgeClass = "badge-high";
  } else if (percentage >= 30) {
    strokeColor = "#BE5103"; // Rust / Gold
    badgeClass = "badge-medium";
  }

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-2 font-sans">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#F4F1EA"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-750 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-charcoal font-mono">{percentage}%</span>
          <span className="text-[10px] font-bold tracking-wider text-charcoal-muted uppercase">Risk Score</span>
        </div>
      </div>
      <div className={`mt-2 ${badgeClass}`}>
        {tier} Risk Tier
      </div>
    </div>
  );
};

export default RiskGauge;
