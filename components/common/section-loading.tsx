export function SectionLoading() {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-stone-50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-wood-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-wood-700 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm text-stone-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}
