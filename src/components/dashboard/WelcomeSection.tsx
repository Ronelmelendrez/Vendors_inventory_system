export function WelcomeSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Welcome to Your Vendor Management System
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Manage your inventory, track sales, monitor vendor performance, and
        generate insightful reports all in one place.
      </p>
      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
        <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
          View Documentation
        </button>
      </div>
    </div>
  );
}
