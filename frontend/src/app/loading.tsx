export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-sm bg-near-black flex items-center justify-center text-canvas-white font-bold animate-pulse">
          N
        </div>
        <div className="text-micro text-slate uppercase tracking-widest animate-pulse">
          Loading Application...
        </div>
      </div>
    </div>
  );
}
