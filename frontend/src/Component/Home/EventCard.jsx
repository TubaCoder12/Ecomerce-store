

const EventCard = ({ event }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden sm:w-80 md:w-[335px] lg:w-[300px] xl:w-full transform transition-transform hover:-translate-y-2 duration-300">
    
    
    <img
       src={event.images[0]} 
      alt={event.title}
      className="h-52 w-full object-cover"
    />

  
    <div className="p-5 flex flex-col gap-2">
      <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>

      <p className="text-sm text-gray-500">
        <span className="font-semibold">Start:</span> {new Date(event.startDate).toLocaleDateString()} <br />
        <span className="font-semibold">End:</span> {new Date(event.endDate).toLocaleDateString()}
      </p>

      <div className="flex justify-between items-center text-gray-500 text-sm">
        <span className="text-orange-500">📍 {event.destination}</span>
        <span>📷 Tour</span>
      </div>

      {event.activities && (
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Activities:</span> {event.activities.join(", ")}
        </p>
      )}

      {event.notes && (
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Notes:</span> {event.notes}
        </p>
      )}
    </div>
  </div>
);
export default EventCard;