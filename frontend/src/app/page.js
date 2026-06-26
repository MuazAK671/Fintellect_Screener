"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, IndianRupee, FileText, Clock, Newspaper, Sparkles } from "lucide-react";

export default function Dashboard() {
  const [deals, setDeals] = useState([]);
  const [results, setResults] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [dealsRes, resultsRes, newsRes] = await Promise.all([
          fetch("http://localhost:5000/api/deals").catch(() => null),
          fetch("http://localhost:5000/api/results").catch(() => null),
          fetch("http://localhost:5000/api/news").catch(() => null),
        ]);

        if (dealsRes && dealsRes.ok) {
          const dealsData = await dealsRes.json();
          setDeals(dealsData.data || []);
        }
        
        if (resultsRes && resultsRes.ok) {
          const resultsData = await resultsRes.json();
          setResults(resultsData.data || []);
        }

        if (newsRes && newsRes.ok) {
          const newsData = await newsRes.json();
          setNews(newsData.data || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalVolume = deals.reduce((acc, curr) => acc + parseFloat(curr.total_value_crores), 0);
  const totalBuyDeals = deals.filter(d => d.transaction_type === 'BUY').length;
  const topGrowthStock = results.length > 0 ? results[0] : null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-400 font-semibold text-xl tracking-wide">Synthesizing Market Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-8 rounded-3xl flex flex-col items-center justify-center backdrop-blur-md">
        <Activity size={56} className="text-rose-500 mb-5 animate-pulse" />
        <h3 className="text-2xl font-bold text-white">Connection Error</h3>
        <p className="mt-3 text-center max-w-lg text-lg text-rose-200/80">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Market Overview</h1>
            <Sparkles className="text-amber-400" size={28} />
          </div>
          <p className="text-lg text-slate-400 font-medium">Real-time analysis of the Indian stock market.</p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-md">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          LIVE MARKET
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group bg-[#151C2C]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-xl hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[50px] group-hover:bg-indigo-500/30 transition-colors"></div>
          <div className="flex items-center justify-between mb-6 relative">
            <h3 className="text-slate-400 font-semibold text-lg tracking-wide">Total Deal Volume Today</h3>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <IndianRupee size={28} />
            </div>
          </div>
          <div className="flex items-baseline gap-3 relative">
            <span className="text-5xl font-extrabold text-white tracking-tight">₹{totalVolume.toFixed(2)}</span>
            <span className="text-indigo-400 font-bold text-xl">Cr</span>
          </div>
        </div>

        <div className="group bg-[#151C2C]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-xl hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[50px] group-hover:bg-emerald-500/20 transition-colors"></div>
          <div className="flex items-center justify-between mb-6 relative">
            <h3 className="text-slate-400 font-semibold text-lg tracking-wide">Buy / Sell Deals</h3>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Activity size={28} />
            </div>
          </div>
          <div className="flex items-baseline gap-4 relative">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-emerald-400 tracking-tight">{totalBuyDeals}</span>
              <span className="text-slate-400 font-bold text-lg">Buys</span>
            </div>
            <span className="text-slate-600 text-2xl font-light">/</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{deals.length - totalBuyDeals}</span>
              <span className="text-slate-500 font-semibold text-lg">Sells</span>
            </div>
          </div>
        </div>

        <div className="group bg-[#151C2C]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-xl hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] group-hover:bg-purple-500/30 transition-colors"></div>
          <div className="flex items-center justify-between mb-6 relative">
            <h3 className="text-slate-400 font-semibold text-lg tracking-wide">Top Growth Quarter</h3>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25">
              <TrendingUp size={28} />
            </div>
          </div>
          {topGrowthStock ? (
            <div className="relative">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white tracking-tight">{topGrowthStock.symbol}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-emerald-400 font-bold text-lg">
                <ArrowUpRight size={22} />
                <span>{topGrowthStock.growth_yoy}% YoY Surge</span>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 mt-4 text-lg">No earnings data</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Daily Deals Data Grid */}
        <div className="xl:col-span-2 bg-[#151C2C]/80 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl flex flex-col overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h2 className="text-2xl font-bold text-white tracking-tight">Daily Bulk & Block Deals</h2>
            <button className="text-base text-indigo-400 font-bold hover:text-indigo-300 transition-colors bg-indigo-500/10 px-5 py-2 rounded-xl">View All Deals</button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            {deals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <FileText size={48} className="text-slate-600 mb-4" />
                <p className="text-xl font-medium text-slate-400">No deals recorded for today.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-slate-400 text-sm uppercase tracking-widest font-bold">
                    <th className="p-6">Ticker</th>
                    <th className="p-6">Investor</th>
                    <th className="p-6">Type</th>
                    <th className="p-6">Action</th>
                    <th className="p-6 text-right">Value (Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-base">
                  {deals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="p-6 font-extrabold text-white text-lg tracking-wide">{deal.symbol}</td>
                      <td className="p-6 text-slate-300 truncate max-w-[250px] font-medium">{deal.client_name}</td>
                      <td className="p-6">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm ${
                          deal.deal_type === 'BULK' 
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}>
                          {deal.deal_type}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border shadow-sm ${
                          deal.transaction_type === 'BUY'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {deal.transaction_type === 'BUY' ? <ArrowUpRight size={16} strokeWidth={3} /> : <ArrowDownRight size={16} strokeWidth={3} />}
                          {deal.transaction_type}
                        </span>
                      </td>
                      <td className="p-6 text-right font-bold text-white text-lg">
                        ₹{parseFloat(deal.total_value_crores).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quarterly Earnings Side-by-Side */}
        <div className="bg-[#151C2C]/80 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl flex flex-col overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-2xl font-bold text-white tracking-tight">Quarterly Earnings</h2>
            <p className="text-base text-slate-400 mt-1 font-medium">Latest corporate performance</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <FileText size={48} className="text-slate-600 mb-4" />
                <p className="text-xl font-medium text-slate-400 text-center">No quarterly results available.</p>
              </div>
            ) : (
              results.map((result) => (
                <div key={result.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h4 className="text-2xl font-extrabold text-white tracking-wide">{result.symbol}</h4>
                      <span className="text-base font-semibold text-slate-400 bg-black/20 px-3 py-1 rounded-md mt-2 inline-block">{result.quarter}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-base font-bold shadow-sm">
                      <TrendingUp size={20} strokeWidth={2.5} />
                      {result.growth_yoy}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                      <div className="text-sm text-slate-400 mb-1.5 font-bold uppercase tracking-wider">Net Profit</div>
                      <div className="text-xl font-extrabold text-white">₹{parseFloat(result.net_profit).toLocaleString()} <span className="text-base font-bold text-indigo-400">Cr</span></div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                      <div className="text-sm text-slate-400 mb-1.5 font-bold uppercase tracking-wider">Margin</div>
                      <div className="text-xl font-extrabold text-white">{result.margin_percent}%</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Latest Market News */}
      <div className="bg-[#151C2C]/80 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl flex flex-col mt-8 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Newspaper size={26} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Market Intelligence</h2>
          </div>
          <button className="text-base text-indigo-400 font-bold hover:text-indigo-300 transition-colors bg-indigo-500/10 px-5 py-2 rounded-xl">View All News</button>
        </div>
        
        <div className="divide-y divide-white/5">
          {news.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <Newspaper size={48} className="text-slate-600 mb-4" />
              <p className="text-xl font-medium text-slate-400">No recent news available.</p>
            </div>
          ) : (
            news.map((item) => (
              <div key={item.id} className="p-8 hover:bg-white/[0.02] transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {item.symbol && (
                      <span className="bg-indigo-500/10 text-indigo-300 px-3 py-1.5 rounded-lg text-sm font-extrabold border border-indigo-500/20 shadow-sm">
                        {item.symbol}
                      </span>
                    )}
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border shadow-sm ${
                      item.sentiment === 'POSITIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      item.sentiment === 'NEGATIVE' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                      'bg-slate-500/10 text-slate-300 border-slate-500/20'
                    }`}>
                      {item.sentiment || 'NEUTRAL'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold bg-black/20 px-3 py-1.5 rounded-lg">
                    <Clock size={16} />
                    {new Date(item.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 cursor-pointer transition-colors leading-tight">
                  <a href={item.source_url} target="_blank" rel="noreferrer">{item.headline}</a>
                </h3>
                <p className="text-lg text-slate-400 line-clamp-2 font-medium leading-relaxed max-w-5xl">{item.summary}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
