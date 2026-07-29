import React, { useState } from 'react';
import { PieChart as PieIcon, Filter, Layers, Zap, Info } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';

export const RiskAnalyticsPage = ({ analyticsData }) => {
  const [selectedContractFilter, setSelectedContractFilter] = useState('All');

  const distribution = analyticsData?.distribution || [
    { tier: 'High Risk (>65%)', count: 32, percentage: 21.3 },
    { tier: 'Medium Risk (30-65%)', count: 30, percentage: 20.0 },
    { tier: 'Low Risk (<30%)', count: 88, percentage: 58.7 }
  ];

  const contractData = [
    { name: 'Month-to-Month', churnRate: analyticsData?.churn_by_contract?.['Month-to-month'] || 42.5, fill: '#A52A2A' },
    { name: 'One Year', churnRate: analyticsData?.churn_by_contract?.['One year'] || 11.2, fill: '#BE5103' },
    { name: 'Two Year', churnRate: analyticsData?.churn_by_contract?.['Two year'] || 2.8, fill: '#800020' }
  ];

  const internetData = [
    { name: 'Fiber Optic', churnRate: analyticsData?.churn_by_internet?.['Fiber optic'] || 38.4, fill: '#BE5103' },
    { name: 'DSL', churnRate: analyticsData?.churn_by_internet?.['DSL'] || 18.9, fill: '#800020' },
    { name: 'No Internet', churnRate: analyticsData?.churn_by_internet?.['No'] || 7.4, fill: '#FFCE1B' }
  ];

  const tenureData = [
    { cohort: '0-12 Mos', churnRate: analyticsData?.churn_by_tenure?.['0-12 Months'] || 48.2 },
    { cohort: '13-24 Mos', churnRate: analyticsData?.churn_by_tenure?.['13-24 Months'] || 28.5 },
    { cohort: '25-48 Mos', churnRate: analyticsData?.churn_by_tenure?.['25-48 Months'] || 14.1 },
    { cohort: '49+ Mos', churnRate: analyticsData?.churn_by_tenure?.['49+ Months'] || 5.8 }
  ];

  const COLORS = ['#A52A2A', '#FFCE1B', '#800020'];

  return (
    <div className="space-y-6 pb-10 font-sans">
      {/* Title Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cardborder pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-burgundy-light text-burgundy text-[11px] font-semibold uppercase tracking-wider mb-1 font-sans">
            <PieIcon className="w-3 h-3" />
            <span>Risk Intelligence Page</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-charcoal tracking-tight font-serif">Risk Distribution & Cohort Analytics</h2>
          <p className="text-charcoal-muted text-xs">Structural analysis of customer churn risk across contract, service, and tenure cohorts.</p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded border border-cardborder text-xs font-sans">
          <Filter className="w-3.5 h-3.5 text-burgundy ml-1" />
          <span className="text-charcoal font-semibold text-[11px]">Contract Filter:</span>
          {['All', 'Month-to-month', 'One year', 'Two year'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedContractFilter(c)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                selectedContractFilter === c
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              {c === 'Month-to-month' ? 'Mo-to-Mo' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* 1. Risk Tier Distribution Card */}
        <div className="juli-card rounded-lg p-5 border border-cardborder space-y-3 bg-white">
          <div className="flex items-center justify-between border-b border-cardborder pb-2">
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <Layers className="w-4 h-4 text-burgundy" />
              <span>Overall Risk Tier Distribution</span>
            </h3>
            <span className="text-[10px] text-charcoal-muted font-mono">Boundaries: 30% / 65%</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val, name, props) => [`${val} Customers (${props.payload.percentage}%)`, props.payload.tier]}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E5DF', borderRadius: '6px', color: '#1A1A1A', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" height={32} wrapperStyle={{ color: '#1A1A1A', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-mono pt-2 border-t border-cardborder">
            <div className="p-2 rounded bg-terracotta-light border border-terracotta/30">
              <span className="text-terracotta font-bold block text-[10px] font-sans">High Risk (&gt;65%)</span>
              <span className="text-charcoal font-extrabold text-sm">{distribution[0]?.count || 0}</span>
            </div>
            <div className="p-2 rounded bg-gold-light border border-gold/50">
              <span className="text-charcoal font-bold block text-[10px] font-sans">Medium (30-65%)</span>
              <span className="text-charcoal font-extrabold text-sm">{distribution[1]?.count || 0}</span>
            </div>
            <div className="p-2 rounded bg-burgundy-light border border-burgundy/20">
              <span className="text-burgundy font-bold block text-[10px] font-sans">Low Risk (&lt;30%)</span>
              <span className="text-charcoal font-extrabold text-sm">{distribution[2]?.count || 0}</span>
            </div>
          </div>
        </div>

        {/* 2. Churn Rate by Contract Type */}
        <div className="juli-card rounded-lg p-5 border border-cardborder space-y-3 bg-white">
          <div className="flex items-center justify-between border-b border-cardborder pb-2">
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <Zap className="w-4 h-4 text-rust" />
              <span>Average Churn Risk by Contract Type</span>
            </h3>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contractData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#1A1A1A" fontSize={11} />
                <YAxis stroke="#5A5A5A" fontSize={11} unit="%" />
                <Tooltip 
                  formatter={(val) => [`${val}% Average Risk`, 'Churn Probability']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E5DF', borderRadius: '6px', color: '#1A1A1A', fontSize: '12px' }}
                />
                <Bar dataKey="churnRate" radius={[4, 4, 0, 0]}>
                  {contractData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 rounded bg-[#F4F1EA] border border-cardborder text-xs text-charcoal flex items-start gap-2">
            <Info className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
            <span>
              <strong>Key Finding:</strong> Month-to-month contracts demonstrate over 4x higher churn risk than annual commitments.
            </span>
          </div>
        </div>

        {/* 3. Churn Rate by Internet Service */}
        <div className="juli-card rounded-lg p-5 border border-cardborder space-y-3 bg-white">
          <h3 className="text-sm font-bold text-charcoal border-b border-cardborder pb-2">Internet Service Profile vs Churn Risk</h3>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={internetData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#1A1A1A" fontSize={11} />
                <YAxis stroke="#5A5A5A" fontSize={11} unit="%" />
                <Tooltip 
                  formatter={(val) => [`${val}% Risk`, 'Avg Churn Risk']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E5DF', borderRadius: '6px', color: '#1A1A1A', fontSize: '12px' }}
                />
                <Bar dataKey="churnRate" radius={[4, 4, 0, 0]}>
                  {internetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Churn Rate by Account Tenure Cohorts */}
        <div className="juli-card rounded-lg p-5 border border-cardborder space-y-3 bg-white">
          <h3 className="text-sm font-bold text-charcoal border-b border-cardborder pb-2">Churn Risk by Customer Tenure Cohorts</h3>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenureData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="cohort" stroke="#1A1A1A" fontSize={11} />
                <YAxis stroke="#5A5A5A" fontSize={11} unit="%" />
                <Tooltip 
                  formatter={(val) => [`${val}% Churn Risk`, 'Avg Probability']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E5DF', borderRadius: '6px', color: '#1A1A1A', fontSize: '12px' }}
                />
                <Bar dataKey="churnRate" fill="#800020" radius={[4, 4, 0, 0]}>
                  {tenureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#A52A2A' : index === 1 ? '#BE5103' : '#800020'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RiskAnalyticsPage;
