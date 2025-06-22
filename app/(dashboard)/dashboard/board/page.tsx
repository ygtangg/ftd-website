"use client";
import { useState, useEffect } from "react";
import { FormEvent } from 'react'

type Performance = {
  id: string;
  title: string;
  performance_datetime: string;
};

function formatMMDDYYYY(isoString: any) {
  const d = new Date(isoString);
  const mm = String(d.getMonth() + 1).padStart(2, "0");  // months are 0-indexed
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export default function BoardDashboard() {

  const [performances, setPerformances] = useState<Performance[]>([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/performance");
      const payload = await res.json();
      if (!res.ok) {
        console.error("Error fetching events:", payload.error);
        return;
      }
      const data: Performance[] = payload.performances;
      setPerformances(data);
    };
    
    fetchEvents();
  }, []);
  
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
    
  //   const form = e.currentTarget;
  //   const formData = new FormData(form);
    
  //   try {
  //     const res = await fetch('/api/performance', {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //     })
  //     if (res.ok) {
  //       console.log('Form submitted successfully!');
  //     } else {
  //       console.error('Error submitting form:', res.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Network error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/performance', {
        method: "POST",
        body: JSON.stringify(formData)
      })
      console.log(res);
      if (res.ok) {
        console.log('Form submitted successfully!');
      } else {
        console.error('Error submitting form:', res.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network error
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Post New Performance Opportunities</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Management */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} method="post" className="space-y-4">
            <p className="text-xl font-semibold mb-4">Performance</p>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" name="title" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date & Time</label>
              <input type="datetime-local" name="performance_datetime" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" name="performance_location" className="w-full p-2 border rounded" />
            </div>
            <p className="text-xl font-semibold mb-4">Rehearsal</p>
            <div>
              <label className="block text-sm font-medium mb-1">Date & Time</label>
              <input type="datetime-local" name="rehearsal_datetime" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" name="rehearsal_location" className="w-full p-2 border rounded" />
            </div>
            <p className="text-xl font-semibold mb-4">Other</p>
            <div>
              <label className="block text-sm font-medium mb-1">Opt-in Deadline</label>
              <input type="datetime-local" name="opt_in_deadline" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (optional)</label>
              <textarea name="description" className="w-full p-2 border rounded" rows={3}></textarea>
            </div>
            <button 
              type="submit"
              className="bg-jujube text-white px-4 py-2 rounded hover:bg-jujube/80"
            >
              {loading ? "Submitting..." : "Submit"}
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
              <div>
                {performances.length > 0 ? (
                  performances.map((performance, index) => (
                    <div key={index} className="p-3 border-t grid grid-cols-3">
                      <div>{performance.title}</div>
                      <div>{formatMMDDYYYY(performance.performance_datetime)}</div>
                      <div>
                        <button className="text-jujube hover:underline">Edit</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3">None</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}