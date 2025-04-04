export default function HomeSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="w-full h-40 bg-neutral-800 rounded-lg"></div>
          <div className="mt-2 h-4 bg-neutral-700 w-3/4 rounded"></div>
          <div className="mt-1 h-3 bg-neutral-700 w-1/2 rounded"></div>
        </div>
      ))}
    </div>
  );
}
