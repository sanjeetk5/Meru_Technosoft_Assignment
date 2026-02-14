export default function InvoiceSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="h-8 w-56 bg-gray-200 rounded-xl"></div>
          <div className="h-4 w-80 bg-gray-200 rounded-lg mt-3"></div>
        </div>

        <div className="flex gap-3">
          <div className="h-12 w-32 bg-gray-200 rounded-2xl"></div>
          <div className="h-12 w-40 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
        {/* Left */}
        <div className="space-y-7">
          <div className="bg-white rounded-3xl border border-gray-200 p-7 space-y-5">
            <div className="flex justify-between">
              <div>
                <div className="h-5 w-40 bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-56 bg-gray-200 rounded-lg mt-2"></div>
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="h-20 bg-gray-100 rounded-2xl border"></div>
              <div className="h-20 bg-gray-100 rounded-2xl border"></div>
              <div className="h-20 bg-gray-100 rounded-2xl border"></div>
              <div className="h-20 bg-gray-100 rounded-2xl border"></div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-7">
            <div className="h-5 w-44 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-lg mt-2"></div>

            <div className="mt-6 space-y-3">
              <div className="h-12 bg-gray-100 rounded-2xl border"></div>
              <div className="h-12 bg-gray-100 rounded-2xl border"></div>
              <div className="h-12 bg-gray-100 rounded-2xl border"></div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-7">
            <div className="h-5 w-36 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-60 bg-gray-200 rounded-lg mt-2"></div>

            <div className="mt-6 space-y-3">
              <div className="h-16 bg-gray-100 rounded-2xl border"></div>
              <div className="h-16 bg-gray-100 rounded-2xl border"></div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white rounded-3xl border border-gray-200 p-7">
          <div className="h-5 w-40 bg-gray-200 rounded-lg"></div>

          <div className="mt-6 bg-gray-100 rounded-3xl border p-7 space-y-5">
            <div className="h-10 w-40 bg-gray-200 rounded-xl"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-lg"></div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="h-20 bg-white rounded-2xl border"></div>
              <div className="h-20 bg-white rounded-2xl border"></div>
            </div>

            <div className="h-36 bg-white rounded-2xl border"></div>

            <div className="h-14 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
