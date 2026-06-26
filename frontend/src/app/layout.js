import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutDashboard, TrendingUp, PieChart, Settings, Bell, Search, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fintellect Dashboard",
  description: "BSE/NSE Daily Deals & Quarterly Earnings Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#0B0F19] antialiased`}
    >
      <body className="flex h-full overflow-hidden text-slate-100 selection:bg-indigo-500/30 bg-[#0B0F19]">
        <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none"></div>
        {/* Sidebar (Desktop) */}
        <aside className="w-72 flex-shrink-0 bg-[#06090F]/80 backdrop-blur-2xl text-white flex flex-col hidden md:flex border-r border-white/5 relative z-20">
          <div className="h-20 flex items-center gap-3 px-8 font-extrabold text-2xl tracking-tight border-b border-white/5">
            <Image src="/logo.png" alt="Fintellect Logo" width={34} height={34} className="rounded-xl shadow-[0_0_15px_rgba(45,212,191,0.3)] border border-teal-500/30" />
            <div>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Fintellect</span>
              <span className="text-white/90 text-lg ml-0.5">.PRO</span>
            </div>
          </div>
          <nav className="flex-1 py-8 px-6 space-y-3">
            <Link href="/" className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all">
              <LayoutDashboard size={22} />
              <span className="text-[1.05rem]">Dashboard</span>
            </Link>
            <Link href="/markets" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-medium">
              <TrendingUp size={22} />
              <span className="text-[1.05rem]">Market Screener</span>
            </Link>
            <Link href="/portfolio" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-medium">
              <PieChart size={22} />
              <span className="text-[1.05rem]">Portfolio</span>
            </Link>
          </nav>
          <div className="p-6 border-t border-white/5">
            <Link href="#" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-medium">
              <Settings size={22} />
              <span className="text-[1.05rem]">Settings</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden bg-[#0B0F19]">
          {/* Top Navbar */}
          <header className="h-20 flex-shrink-0 bg-[#0B0F19]/70 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-6 md:px-10 z-30 sticky top-0">
            <div className="flex items-center gap-4 max-w-xl w-full">
              {/* Mobile Logo */}
              <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight md:hidden">
                <Image src="/logo.png" alt="Fintellect Logo" width={28} height={28} className="rounded-lg shadow-[0_0_10px_rgba(45,212,191,0.3)] border border-teal-500/30" />
                <div>
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Fintellect</span>
                  <span className="text-white text-lg ml-0.5">.PRO</span>
                </div>
              </div>
              <div className="hidden md:flex items-center w-full relative group">
                <Search className="absolute left-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search stocks, investors, news..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all font-medium text-[1.05rem]"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative p-2.5 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.6)] border-2 border-[#0B0F19]"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">Admin User</div>
                  <div className="text-xs font-medium text-emerald-400">Pro Member</div>
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)] border-2 border-indigo-300/30">
                  <User size={20} />
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 md:p-10 pb-28 md:pb-10 relative">
            {/* Ambient glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>

          {/* Mobile Bottom Nav */}
          <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#06090F]/90 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center h-20 z-50 px-2 pb-safe">
            <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-indigo-400">
              <LayoutDashboard size={24} />
              <span className="text-[11px] mt-1.5 font-bold">Home</span>
            </Link>
            <Link href="/markets" className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-indigo-400 transition-colors">
              <TrendingUp size={24} />
              <span className="text-[11px] mt-1.5 font-semibold">Markets</span>
            </Link>
            <Link href="/portfolio" className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-indigo-400 transition-colors">
              <PieChart size={24} />
              <span className="text-[11px] mt-1.5 font-semibold">Portfolio</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-indigo-400 transition-colors">
              <Settings size={24} />
              <span className="text-[11px] mt-1.5 font-semibold">Settings</span>
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
