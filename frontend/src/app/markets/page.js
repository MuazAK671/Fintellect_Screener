export default function Markets() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
      <div className="text-indigo-500 bg-indigo-50 p-4 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
      </div>
      <h1 className="text-2xl font-bold text-slate-900">Market Screener</h1>
      <p className="text-slate-500 text-center max-w-md">
        This section is currently under development. Soon you'll be able to screen stocks based on advanced technical and fundamental indicators.
      </p>
    </div>
  );
}
