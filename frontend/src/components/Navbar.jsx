import React from 'react';
import TulipLogo from './TulipLogo';
import { LayoutDashboard, PieChart, Users, Sparkles, Home, Activity } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, apiStatus }) => {
  const navItems = [
    { id: 'welcome', label: 'Welcome', icon: Home },
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Risk Analytics', icon: PieChart },
    { id: 'customers', label: 'Customer Directory', icon: Users },
    { id: 'predictor', label: 'Risk Predictor', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E8E5DF] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Header */}
        <div 
          onClick={() => setActiveTab('welcome')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Oval Pearl Logo Container */}
          <div className="p-0.5 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-200">
            <TulipLogo size={36} />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cursive text-3xl font-bold tracking-wide text-burgundy leading-none">
                Juli
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-burgundy-light text-burgundy border border-burgundy/20 font-mono">
                Retention AI
              </span>
            </div>
            <p className="text-[11px] text-charcoal-muted font-sans font-medium">Customer Churn Prediction Platform</p>
          </div>
        </div>

        {/* Navigation Tabs (Standard Lora Font) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4F1EA] p-1 rounded-md border border-[#E8E5DF] font-sans">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-burgundy text-white font-semibold shadow-sm'
                    : 'text-charcoal-muted hover:text-burgundy hover:bg-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold' : 'text-burgundy'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* API Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-[#F4F1EA] border border-[#E8E5DF] text-xs font-mono">
          <Activity className="w-3.5 h-3.5 text-burgundy animate-pulse" />
          <span className="text-charcoal-muted text-[11px] font-sans">API:</span>
          <span className={`font-bold text-[11px] ${apiStatus === 'online' ? 'text-burgundy' : 'text-rust'}`}>
            {apiStatus === 'online' ? 'Connected' : 'Standalone'}
          </span>
        </div>

      </div>

      {/* Mobile Navigation Row */}
      <div className="md:hidden flex items-center justify-around bg-[#F4F1EA] px-2 py-1.5 border-t border-[#E8E5DF] font-sans">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded text-[11px] font-medium transition-all ${
                isActive ? 'bg-burgundy text-white font-semibold' : 'text-charcoal-muted'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default Navbar;
