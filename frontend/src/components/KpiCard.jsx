import React from 'react';

export const KpiCard = ({ title, value, subtitle, icon: Icon, accentColor = 'emerald', badgeText }) => {
  const borderAccents = {
    emerald: 'border-l-4 border-l-burgundy border-cardborder',
    lemon: 'border-l-4 border-l-gold border-cardborder',
    lavender: 'border-l-4 border-l-rust border-cardborder',
    rose: 'border-l-4 border-l-terracotta border-cardborder',
  };

  const iconColors = {
    emerald: 'text-burgundy bg-burgundy-light border-burgundy/20',
    lemon: 'text-burgundy bg-gold-light border-gold/40',
    lavender: 'text-rust bg-rust-light border-rust/30',
    rose: 'text-terracotta bg-terracotta-light border-terracotta/30',
  };

  return (
    <div className={`juli-card juli-card-hover rounded-lg p-5 bg-white border ${borderAccents[accentColor] || borderAccents.emerald} transition-all font-sans`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] uppercase font-semibold tracking-wider text-charcoal-muted block mb-1">{title}</span>
          <h3 className="text-2xl font-bold text-charcoal font-mono tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-charcoal-muted font-medium mt-1">{subtitle}</p>}
        </div>
        
        {Icon && (
          <div className={`p-2.5 rounded-md border ${iconColors[accentColor] || iconColors.emerald}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {badgeText && (
        <div className="mt-3 pt-2.5 border-t border-cardborder flex items-center justify-between text-[11px] text-charcoal-muted font-mono">
          <span>{badgeText}</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;
