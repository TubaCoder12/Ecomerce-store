import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { api } from "../../ApiRoute/ApiRoute";
import { sucessToast, errorToast } from "../Helpers/Messages";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const FeatureEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // search by destination
  const [date, setDate] = useState(""); // filter by start date

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await api.get("/event/fetch");
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/event/delete/${id}`);
      sucessToast(res.data.message || "Event deleted successfully");
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      errorToast(err?.response?.data?.error || "Failed to delete event");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // -----------------------------
  // Filtered events based on search & date
  // -----------------------------
  const filteredEvents = events.filter((e) => {
    const matchesSearch = search
      ? e.destination.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesDate = date
      ? new Date(e.startDate).toISOString().split("T")[0] === date
      : true;
    return matchesSearch && matchesDate;
  });

  if (loading)
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-8">Loading events...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-8 text-red-500">{error}</div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#FFF7EB]">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-6">
          View Feature Events
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  End Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Updated At
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents?.map((e) => (
                <tr key={e._id} className="border-b hover:bg-gray-50">
                  {/* Image column */}
                  <td className="px-6 py-4">
                    <img
                      src={
                        e.images[0]
                      }
                      alt={e.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>

                  {/* Title */}
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {e.title}
                  </td>

                  {/* Destination */}
                  <td className="px-6 py-4 text-gray-700">{e.destination}</td>

                  {/* Dates */}
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(e.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(e.endDate).toLocaleDateString()}
                  </td>

                  {/* Created / Updated */}
                  <td className="px-6 py-4 text-gray-600">
                    {formatDateTime(e.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDateTime(e.updatedAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 space-x-2 flex items-center">
                    <Link
                      to={`/EditEvent/${e._id}`}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="px-3 py-1 text-red-600 rounded-lg text-sm flex items-center justify-center"
                    >
                      <MdDelete size={22} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredEvents?.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeatureEvents;
