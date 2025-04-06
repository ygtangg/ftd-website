export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl mb-4">Loading your dashboard...</p>
        <div className="w-8 h-8 border-4 border-jujube border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
} 