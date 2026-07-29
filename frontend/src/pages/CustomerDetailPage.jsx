import React from 'react';
import { X, User } from 'lucide-react';
import RiskGauge from '../components/RiskGauge';
import ShapWaterfallChart from '../components/ShapWaterfallChart';

export const CustomerDetailPage = ({ customerDetail, onClose }) => {
  if (!customerDetail) return null;

  const { customer, explanation } = customerDetail;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="juli-card rounded-lg border border-cardborder max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-xl relative bg-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cardborder pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-burgundy-light border border-burgundy/20">
              <User className="w-5 h-5 text-burgundy" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-charcoal font-mono">{customer.id}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-burgundy text-white font-semibold font-sans">
                  Account Analysis
                </span>
              </div>
              <p className="text-xs text-charcoal-muted">Detailed Risk Diagnostics & SHAP Feature Attributions</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#F4F1EA] hover:bg-[#E8E5DF] border border-cardborder text-charcoal-muted hover:text-charcoal transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Summary Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center bg-[#F4F1EA] p-4 rounded-md border border-cardborder">
          <div className="flex flex-col items-center justify-center md:border-r md:border-cardborder">
            <RiskGauge score={customer.churn_probability} tier={customer.risk_tier} />
          </div>

          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal font-sans">Account Overview</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-white border border-cardborder">
                <span className="text-charcoal-muted block text-[10px] font-sans">Contract</span>
                <span className="text-charcoal font-bold font-sans">{customer.contract}</span>
              </div>
              <div className="p-2 rounded bg-white border border-cardborder">
                <span className="text-charcoal-muted block text-[10px] font-sans">Tenure</span>
                <span className="text-charcoal font-bold">{customer.tenure} Months</span>
              </div>
              <div className="p-2 rounded bg-white border border-cardborder">
                <span className="text-charcoal-muted block text-[10px] font-sans">Monthly Bill</span>
                <span className="text-burgundy font-bold">${customer.monthly_charges}</span>
              </div>
              <div className="p-2 rounded bg-white border border-cardborder">
                <span className="text-charcoal-muted block text-[10px] font-sans">Internet Service</span>
                <span className="text-charcoal font-bold font-sans">{customer.internet_service}</span>
              </div>
              <div className="p-2 rounded bg-white border border-cardborder">
                <span className="text-charcoal-muted block text-[10px] font-sans">Support Calls</span>
                <span className={`font-bold ${customer.support_calls >= 4 ? 'text-terracotta' : 'text-burgundy'}`}>
                  {customer.support_calls} Calls
                </span>
              </div>
              <div className="p-2 rounded bg-white border border-cardborder">
                <span className="text-charcoal-muted block text-[10px] font-sans">Payment Method</span>
                <span className="text-charcoal font-medium truncate block font-sans">{customer.payment_method}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SHAP Explanation Section */}
        <div className="juli-card rounded-md p-4 border border-cardborder bg-[#FDFBF7]">
          <ShapWaterfallChart reasons={explanation} />
        </div>

        {/* Profile Attributes */}
        <div className="space-y-2 font-sans">
          <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal">Complete Profile Attributes</h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-[#F4F1EA] border border-cardborder">
              <span className="text-charcoal-muted block text-[10px] font-sans">Gender</span>
              <span className="text-charcoal font-semibold font-sans">{customer.gender}</span>
            </div>
            <div className="p-2 rounded bg-[#F4F1EA] border border-cardborder">
              <span className="text-charcoal-muted block text-[10px] font-sans">Senior Citizen</span>
              <span className="text-charcoal font-semibold font-sans">{customer.senior_citizen ? 'Yes' : 'No'}</span>
            </div>
            <div className="p-2 rounded bg-[#F4F1EA] border border-cardborder">
              <span className="text-charcoal-muted block text-[10px] font-sans">Partner</span>
              <span className="text-charcoal font-semibold font-sans">{customer.partner}</span>
            </div>
            <div className="p-2 rounded bg-[#F4F1EA] border border-cardborder">
              <span className="text-charcoal-muted block text-[10px] font-sans">Dependents</span>
              <span className="text-charcoal font-semibold font-sans">{customer.dependents}</span>
            </div>
            <div className="p-2 rounded bg-[#F4F1EA] border border-cardborder">
              <span className="text-charcoal-muted block text-[10px] font-sans">Tech Support</span>
              <span className="text-charcoal font-semibold font-sans">{customer.tech_support}</span>
            </div>
            <div className="p-2 rounded bg-[#F4F1EA] border border-cardborder">
              <span className="text-charcoal-muted block text-[10px] font-sans">Online Security</span>
              <span className="text-charcoal font-semibold font-sans">{customer.online_security}</span>
            </div>
            <div className="p-2 rounded bg-[#F4F1EA] border border-cardborder">
              <span className="text-charcoal-muted block text-[10px] font-sans">Paperless Billing</span>
              <span className="text-charcoal font-semibold font-sans">{customer.paperless_billing}</span>
            </div>
            <div className="p-2 rounded bg-[#F4F1EA] border border-cardborder">
              <span className="text-charcoal-muted block text-[10px] font-sans">Total Charges</span>
              <span className="text-charcoal font-semibold">${customer.total_charges}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end pt-3 border-t border-cardborder font-sans">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-burgundy hover:bg-burgundy-hover text-white font-semibold text-xs shadow transition-all"
          >
            Close Analysis
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerDetailPage;
