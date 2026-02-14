export default function InvoiceListSkeleton() {
  const skeletonCards = new Array(6).fill(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 overflow-hidden relative"
        >
          {/* Shimmer Layer */}
          <div className="shimmer"></div>

          {/* Header */}
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-3">
              <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-36 bg-gray-200 rounded-xl"></div>
            </div>

            <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          </div>

          {/* Customer */}
          <div className="mt-6 space-y-3 relative z-10">
            <div className="h-3 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-44 bg-gray-200 rounded-xl"></div>
          </div>

          {/* Dates */}
          <div className="mt-6 grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3">
              <div className="h-3 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded-xl"></div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3">
              <div className="h-3 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded-xl"></div>
            </div>
          </div>

          {/* Totals */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4 relative z-10">
            <div className="flex justify-between">
              <div className="h-3 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex justify-between">
              <div className="h-3 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex justify-between">
              <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-3 w-24 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
