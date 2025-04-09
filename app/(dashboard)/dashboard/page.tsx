export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
          <p className="text-gray-600">
            Use the sidebar to navigate through different sections.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <p className="text-gray-600">
            Check the calendar for upcoming performances.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
          <div className="space-y-2 mt-4">
            <a href="/dashboard/board" className="text-jujube hover:underline block">View Calendar</a>
            <a href="/dashboard/member" className="text-jujube hover:underline block">Sign Up for Performances</a>
          </div>
        </div>
      </div>
    </div>
  );
}