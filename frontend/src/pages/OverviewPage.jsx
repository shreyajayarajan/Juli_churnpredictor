import React from 'react';
import KpiCard from '../components/KpiCard';
import { Users, AlertTriangle, DollarSign, Award, ArrowUpRight, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

export const OverviewPage = ({ summaryData, analyticsData, highRiskCustomers = [], onSelectCustomer, setActiveTab }) => {
  const total = summaryData?.total_customers || 150;
  const highRiskCount = summaryData?.high_risk_count || 32;
  const highRiskPct = summaryData?.high_risk_pct || 21.3;
  const revenueAtRisk = summaryData?.revenue_at_risk || 38400;
  const accuracy = summaryData?.model_accuracy || 85.4;

  const pieData = [
    { name: 'Low Risk', value: summaryData?.low_risk_count || 88, color: '#800020' },
    { name: 'Medium Risk', value: summaryData?.medium_risk_count || 30, color: '#FFCE1B' },
    { name: 'High Risk', value: summaryData?.high_risk_count || 32, color: '#A52A2A' }
  ];

  const topDrivers = analyticsData?.top_global_drivers || [
    { feature: 'Month-to-Month Contract', importance: 0.28 },
    { feature: 'Fiber Optic Internet', importance: 0.22 },
    { feature: 'High Support Call Count', importance: 0.18 },
    { feature: 'Short Account Tenure', importance: 0.15 },
    { feature: 'Electronic Check Payment', importance: 0.10 }
  ];

  return (
    <div className="space-y-6 pb-10 font-sans">
      {/* Title Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cardborder pb-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-charcoal tracking-tight font-serif">Executive Retention Dashboard</h2>
          <p className="text-charcoal-muted text-xs">Real-time churn metrics, risk distribution, and high-priority accounts.</p>
        </div>
        <button
          onClick={() => setActiveTab('analytics')}
          className="px-4 py-2 rounded bg-burgundy hover:bg-burgundy-hover text-white font-semibold text-xs flex items-center gap-1.5 w-fit transition-all shadow-sm"
        >
          <span>View Deep-dive Risk Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Customers"
          value={total.toLocaleString()}
          subtitle="Monitored Accounts"
          icon={Users}
          accentColor="emerald"
          badgeText="Active SQLite Database"
        />
        <KpiCard
          title="High Risk Customers"
          value={`${highRiskCount} (${highRiskPct}%)`}
          subtitle="Churn Risk > 65%"
          icon={AlertTriangle}
          accentColor="rose"
          badgeText="Requires Immediate Outreach"
        />
        <KpiCard
          title="Annual Revenue at Risk"
          value={`$${revenueAtRisk.toLocaleString()}`}
          subtitle="High Risk Subscriber ARR"
          icon={DollarSign}
          accentColor="lemon"
          badgeText="Monthly Charges × 12"
        />
        <KpiCard
          title="Model Accuracy"
          value={`${accuracy}%`}
          subtitle="XGBoost Champion"
          icon={Award}
          accentColor="lavender"
          badgeText="SMOTE Validated"
        />
      </div>

      {/* Analytics Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Risk Distribution Donut */}
        <div className="juli-card rounded-lg p-5 border border-cardborder flex flex-col justify-between bg-white">
          <div className="flex items-center justify-between border-b border-cardborder pb-2 mb-2">
            <h3 className="text-sm font-bold text-charcoal">Risk Tier Breakdown</h3>
            <span className="text-[10px] text-charcoal-muted font-mono">3 Tiers</span>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E5DF', borderRadius: '6px', color: '#1A1A1A', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-charcoal font-mono">{total}</span>
              <span className="text-[9px] uppercase tracking-wider text-charcoal-muted font-semibold">Total</span>
            </div>
          </div>

          <div className="flex items-center justify-around pt-2 border-t border-cardborder text-xs font-mono">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-charcoal-muted font-sans">{item.name.split(' ')[0]}:</span>
                <span className="font-bold text-charcoal">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Drivers Horizontal Bar Chart */}
        <div className="juli-card rounded-lg p-5 border border-cardborder lg:col-span-2 space-y-3 bg-white">
          <div className="flex items-center justify-between border-b border-cardborder pb-2">
            <div>
              <h3 className="text-sm font-bold text-charcoal">Top Global Churn Drivers</h3>
              <p className="text-[11px] text-charcoal-muted">SHAP feature attributions across full dataset</p>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topDrivers} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <XAxis type="number" stroke="#5A5A5A" fontSize={11} tickFormatter={(val) => `${Math.round(val * 100)}%`} />
                <YAxis dataKey="feature" type="category" stroke="#1A1A1A" fontSize={11} width={150} tickLine={false} />
                <Tooltip 
                  formatter={(val) => [`${(val * 100).toFixed(1)}% Impact`, 'SHAP Importance']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E5DF', borderRadius: '6px', color: '#1A1A1A', fontSize: '12px' }}
                />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                  {topDrivers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#A52A2A' : index === 1 ? '#BE5103' : '#800020'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* High-Risk Accounts Table Preview */}
      <div className="juli-card rounded-lg border border-cardborder overflow-hidden bg-white">
        <div className="px-5 py-3.5 bg-[#F4F1EA] border-b border-cardborder flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-terracotta" />
            <h3 className="text-sm font-bold text-charcoal">Urgent Action — High Risk Subscribers</h3>
          </div>
          
          <button
            onClick={() => setActiveTab('customers')}
            className="text-xs text-burgundy hover:underline font-semibold flex items-center gap-1"
          >
            <span>View Customer Directory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white text-charcoal-muted uppercase font-semibold border-b border-cardborder">
              <tr>
                <th className="py-2.5 px-4">Customer ID</th>
                <th className="py-2.5 px-4">Contract</th>
                <th className="py-2.5 px-4">Tenure</th>
                <th className="py-2.5 px-4">Monthly Bill</th>
                <th className="py-2.5 px-4">Support Calls</th>
                <th className="py-2.5 px-4 text-center">Risk Score</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cardborder font-mono">
              {highRiskCustomers.slice(0, 5).map((c) => (
                <tr key={c.id} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="py-2.5 px-4 font-bold text-charcoal">{c.id}</td>
                  <td className="py-2.5 px-4 text-charcoal font-sans">{c.contract}</td>
                  <td className="py-2.5 px-4 text-charcoal">{c.tenure} mos</td>
                  <td className="py-2.5 px-4 text-burgundy font-bold">${c.monthly_charges}</td>
                  <td className="py-2.5 px-4 text-charcoal">{c.support_calls} calls</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="badge-high">
                      {Math.round(c.churn_probability * 100)}%
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => onSelectCustomer(c.id)}
                      className="px-2.5 py-1 rounded bg-burgundy hover:bg-burgundy-hover text-white font-sans font-semibold text-[11px] transition-all shadow-sm"
                    >
                      SHAP Analysis
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
