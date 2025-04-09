export default function CalendarPage() {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl mb-4">Calendar</h1>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Current Performances</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 p-3">
                <div className="font-medium">Title</div>
                <div className="font-medium">Date & Time</div>
                <div className="font-medium">Location</div>
              </div>
              <div className="p-3 border-t grid grid-cols-3">
                <div>Example Performance</div>
                <div>Dec 5, 2024 7:30 PM</div>
                <div>Theater</div>
              </div>
            </div>
          </div>
        </div>
    );
}