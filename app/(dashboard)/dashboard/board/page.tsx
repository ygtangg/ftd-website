// app/dashboard/board/page.tsx
"use client";

export default function BoardDashboard() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Board Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Management */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Post Performance Opportunities</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Performance Title</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="w-full p-2 border rounded" rows={3}></textarea>
            </div>
            <button className="bg-jujube text-white px-4 py-2 rounded hover:bg-jujube/80">
              Add Performance
            </button>
          </form>
        </div>
        
        {/* Calendar Management */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Update Calendar</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Current Performances</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 p-3">
                <div className="font-medium">Title</div>
                <div className="font-medium">Date</div>
                <div className="font-medium">Actions</div>
              </div>
              <div className="p-3 border-t grid grid-cols-3">
                <div>Example Performance</div>
                <div>Dec 5, 2024</div>
                <div>
                  <button className="text-jujube hover:underline">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}