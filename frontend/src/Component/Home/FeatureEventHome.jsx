import React, { useState, useEffect } from "react";
import { api } from "../../ApiRoute/ApiRoute";
import EventCard from './EventCard'
// Event Card Component



// Feature Events Component
const FeatureEvents = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleUpcoming, setVisibleUpcoming] = useState(8);
  const [visiblePast, setVisiblePast] = useState(8);

  const fetchEvents = async () => {
  setLoading(true);
  setError("");

  try {
    console.log("Fetching events...");
    const res = await api.get("/event/fetch");
    console.log("Events fetched successfully:", res.data);
    setEvents(res.data.events || []);
  } catch (err) {
    console.error("Error fetching events - Full error:", err);
    console.error("Error status:", err.response?.status);
    console.error("Error message:", err.message);
    
    if (err.response?.status === 401 || err.message?.includes("login")) {
      setError("Please login first to view or create events.");
    } else {
      setError(err.response?.data?.error || err.message || "Failed to fetch events");
    }
    setEvents([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events
  const filteredEvents = events.filter((e) => {
    const matchesSearch = search ? e.destination.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesDate = date ? new Date(e.startDate).toISOString().split("T")[0] === date : true;
    return matchesSearch && matchesDate;
  });

  // Split Upcoming & Past
  const now = new Date();
  const upcomingTrips = filteredEvents.filter((e) => new Date(e.startDate) > now);
  const pastTrips = filteredEvents.filter((e) => new Date(e.endDate) < now);

  // If still loading
  if (loading) {
    return <p className="bg-[#FFF7EB] text-center py-20 text-gray-600">Loading events...</p>;
  }

  // If there's an error
  if (error) {
    return (
      <section className="bg-[#FFF7EB] py-20">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <div className=" rounded-lg shadow-md p-8 max-w-md mx-auto">
            
            <p className="text-red-600 mb-6">{error}</p>
            
          </div>
        </div>
      </section>
    );
  }

  // Main component render
  return (
    <section className="bg-[#FFF7EB] py-20">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className=" font-volkhov text-4xl md:text-5xl font-bold text-start text-gray-900 mb-6">
          Travel <span className="text-orange-500">Events</span>
        </h2>
        <p className="mb-10 text-gray-600">
          Manage your events from the dashboard: add new events, view existing ones, update details, and delete if needed.
        </p>

        {/* Upcoming Trips */}
        <section className="mb-16">
          <h3 className="text-3xl font-volkhov font-semibold mb-6 text-orange-500">Upcoming Trips</h3>
          {upcomingTrips.length === 0 ? (
            <p className="text-gray-500">No upcoming trips.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {upcomingTrips.slice(0, visibleUpcoming).map((e) => (
                  <EventCard key={e._id} event={e} />
                ))}
              </div>
              {visibleUpcoming < upcomingTrips.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleUpcoming((prev) => prev + 5)}
                    className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Past Trips */}
        <section>
          <h3 className="text-3xl font-volkhov font-semibold text-orange-500 mb-6">Past Trips</h3>
          {pastTrips.length === 0 ? (
            <p className="text-gray-500">No past trips.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pastTrips.slice(0, visiblePast).map((e) => (
                  <EventCard key={e._id} event={e} />
                ))}
              </div>
              {visiblePast < pastTrips.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisiblePast((prev) => prev + 5)}
                    className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </section>
  );
};

export default FeatureEvents;