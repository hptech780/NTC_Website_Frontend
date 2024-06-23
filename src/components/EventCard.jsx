import React, { useEffect, useState } from 'react';

const EventCards = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('resources/json/events.json')
      .then(response => response.json())
      .then(data => {
        const sortedEvents = data.events.sort(
          (a, b) => new Date(b.start_date) - new Date(a.start_date)
        );
        setEvents(sortedEvents);
      })
      .catch(error => console.error('Error fetching events data:', error));
  }, []);

  return (
    <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="event-cards-container">
      {events.map(event => (
        <div key={event.title} className="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden">
          <div className={`absolute top-0 right-0 m-2 px-2 py-1 rounded-lg text-sm font-bold ${new Date() > new Date(event.end_date) ? 'bg-red-500' : 'bg-green-500'} text-white`}>
            {new Date() > new Date(event.end_date) ? 'Completed' : 'Reg. Open'}
          </div>
          <img src={event.banner} alt={event.title} className="w-full mb-4 rounded-md" />
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <div className="text-gray-600 mb-4 flex items-center">
            <img src="resources/img/icons/date-and-time-icon.svg" className="h-4 w-4 mr-1" alt="Date Icon" />
            {event.start_date} - {event.end_date}
          </div>
          <div className="text-gray-600 mb-4 flex items-center">
            <img src="resources/img/icons/pin-location-icon.svg" className="h-4 w-4 mr-1" alt="Location Icon" />
            {event.location}
          </div>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <a href="#" className="primary-text font-bold text-blue-600 hover:underline">Know More</a>
        </div>
      ))}
    </div>
  );
};

export default EventCards;
