export default function Portfolio() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
      <div className="text-emerald-500 bg-emerald-50 p-4 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
      </div>
      <h1 className="text-2xl font-bold text-slate-900">Your Portfolio</h1>
      <p className="text-slate-500 text-center max-w-md">
        This section is currently under development. Soon you'll be able to track your holdings, analyze returns, and manage risk.
      </p>
    </div>
  );
}
