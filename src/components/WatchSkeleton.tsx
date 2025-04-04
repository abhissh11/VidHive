export default function WatchSkeleton() {
  return (
    <div className="flex gap-4 p-4">
      {/* Left - Video Player */}
      <div className="flex-1">
        <div className="w-full h-[400px] bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="mt-4 h-6 bg-gray-700 w-3/4 rounded"></div>
        <div className="mt-2 h-4 bg-gray-700 w-1/2 rounded"></div>
      </div>

      {/* Right - Suggested Videos */}
      <div className="w-[300px] space-y-4 hidden md:block">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex gap-3 animate-pulse">
            <div className="w-24 h-16 bg-gray-800 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-700 w-3/4 rounded"></div>
              <div className="mt-2 h-3 bg-gray-700 w-1/2 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
