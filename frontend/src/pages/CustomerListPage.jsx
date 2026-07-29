import React from 'react';
import { Search, ChevronLeft, ChevronRight, Eye, FileText } from 'lucide-react';

export const CustomerListPage = ({
  customerData,
  search,
  setSearch,
  riskFilter,
  setRiskFilter,
  contractFilter,
  setContractFilter,
  page,
  setPage,
  onSelectCustomer
}) => {
  const customers = customerData?.customers || [];
  const totalPages = customerData?.total_pages || 1;
  const totalCount = customerData?.total || customers.length;

  const getBadgeClass = (tier) => {
    if (tier === 'High') return 'badge-high';
    if (tier === 'Medium') return 'badge-medium';
    return 'badge-low';
  };

  return (
    <div className="space-y-5 pb-10 font-sans">
      {/* Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cardborder pb-3">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-charcoal tracking-tight font-serif">Customer Directory</h2>
          <p className="text-charcoal-muted text-xs font-sans">Pre-scored customer accounts with risk classifications & contract parameters.</p>
        </div>
        <div className="text-xs text-charcoal-muted font-mono">
          Showing <span className="text-charcoal font-bold">{customers.length}</span> of <span className="text-charcoal font-bold">{totalCount}</span> Accounts
        </div>
      </div>

      {/* Search & Toolbar */}
      <div className="juli-card rounded-lg p-3 border border-cardborder flex flex-col md:flex-row gap-3 items-center justify-between bg-white">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80 font-sans">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Customer ID (e.g. 7590-WBEN)..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-[#F4F1EA] border border-cardborder rounded pl-9 pr-3 py-1.5 text-xs text-charcoal placeholder-charcoal-subtle focus:outline-none"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-sans">
          
          {/* Risk Tier Filter Pills */}
          <div className="flex items-center gap-1 bg-[#F4F1EA] p-1 rounded border border-cardborder text-xs">
            <span className="px-2 text-charcoal-muted font-semibold text-[11px]">Risk:</span>
            {['All', 'High', 'Medium', 'Low'].map((r) => (
              <button
                key={r}
                onClick={() => { setRiskFilter(r); setPage(1); }}
                className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                  riskFilter === r
                    ? r === 'High' ? 'bg-terracotta text-white' : r === 'Medium' ? 'bg-gold text-charcoal font-bold' : r === 'Low' ? 'bg-burgundy text-white' : 'bg-white text-charcoal font-bold shadow-sm'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Contract Filter Dropdown */}
          <select
            value={contractFilter}
            onChange={(e) => { setContractFilter(e.target.value); setPage(1); }}
            className="bg-[#F4F1EA] border border-cardborder text-charcoal text-xs rounded px-3 py-1.5 focus:outline-none"
          >
            <option value="All">All Contract Types</option>
            <option value="Month-to-month">Month-to-month</option>
            <option value="One year">One year</option>
            <option value="Two year">Two year</option>
          </select>

        </div>
      </div>

      {/* Customer SaaS Table */}
      <div className="juli-card rounded-lg border border-cardborder overflow-hidden shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F1EA] text-charcoal-muted uppercase font-semibold border-b border-cardborder font-sans">
              <tr>
                <th className="py-3 px-4">Customer ID</th>
                <th className="py-3 px-4">Contract</th>
                <th className="py-3 px-4">Internet</th>
                <th className="py-3 px-4">Tenure</th>
                <th className="py-3 px-4">Monthly</th>
                <th className="py-3 px-4">Support Calls</th>
                <th className="py-3 px-4 text-center">Risk Tier</th>
                <th className="py-3 px-4 text-center">Churn Prob</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cardborder font-mono">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-charcoal-muted font-sans">
                    No customer records found matching the current filters.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-3 px-4 font-bold text-charcoal flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-burgundy" />
                      <span>{c.id}</span>
                    </td>
                    <td className="py-3 px-4 text-charcoal font-sans">{c.contract}</td>
                    <td className="py-3 px-4 text-charcoal font-sans">{c.internet_service}</td>
                    <td className="py-3 px-4 text-charcoal">{c.tenure} mos</td>
                    <td className="py-3 px-4 text-burgundy font-bold">${c.monthly_charges}</td>
                    <td className="py-3 px-4 text-charcoal">
                      <span className={`px-1.5 py-0.5 rounded ${c.support_calls >= 4 ? 'bg-terracotta-light text-terracotta font-bold' : 'text-charcoal'}`}>
                        {c.support_calls}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-sans">
                      <span className={getBadgeClass(c.risk_tier)}>
                        {c.risk_tier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-charcoal">
                      {(c.churn_probability * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-right font-sans">
                      <button
                        onClick={() => onSelectCustomer(c.id)}
                        className="px-2.5 py-1 rounded bg-burgundy hover:bg-burgundy-hover text-white font-semibold text-[11px] transition-all flex items-center gap-1 ml-auto shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>SHAP Profile</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-[#F4F1EA] px-4 py-2.5 border-t border-cardborder flex items-center justify-between text-xs">
          <span className="text-charcoal-muted font-mono">
            Page <strong className="text-charcoal">{page}</strong> of <strong className="text-charcoal">{totalPages}</strong>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded bg-white border border-cardborder text-charcoal hover:bg-[#FDFBF7] disabled:opacity-40 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 rounded bg-white border border-cardborder text-charcoal hover:bg-[#FDFBF7] disabled:opacity-40 transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerListPage;
