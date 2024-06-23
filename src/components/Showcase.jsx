import React, { useEffect, useState } from 'react';

const Showcase = () => {
  const [nearestEvent, setNearestEvent] = useState(null);

  useEffect(() => {
    fetch('resources/json/events.json')
      .then(response => response.json())
      .then(data => {
        const openEvents = data.events.filter(event => new Date() < new Date(event.end_date));
        openEvents.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        setNearestEvent(openEvents.length > 0 ? openEvents[0] : null);
      })
      .catch(error => console.error('Error fetching events data:', error));
  }, []);

  if (!nearestEvent) {
    return null;
  }

  return (
    <div id="showcase-section">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between">
        <div className="w-full lg:w-7/12 lg:order-2">
          <div className="flex h-full items-center rounded-lg primary-bg p-8 lg:p-12 text-center text-white lg:text-left">
            <div className="lg:pl-12 lg:pr-6">
              <h2 className="mb-6 text-3xl font-bold">{nearestEvent.title}</h2>
              <div className="mb-4 text-gray-600 flex items-center">
                <img src="resources/img/icons/date-and-time-icon.svg" className="h-4 w-4 mr-1 fill-current" alt="Date Icon" />
                <span>{nearestEvent.start_date} - {nearestEvent.end_date}</span>
              </div>
              <div className="mb-4 text-gray-600 flex items-center">
                <img src="resources/img/icons/pin-location-icon.svg" className="h-4 w-4 mr-1 fill-current" alt="Location Icon" />
                <span>{nearestEvent.location}</span>
              </div>
              <p className="mb-4 text-gray-600">{nearestEvent.description}</p>
              <a href={nearestEvent.registration_url} className="inline-block rounded-full border-2 border-neutral-50 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200">Register now</a>
            </div>
          </div>
        </div>
        <div className="mb-12 w-full lg:mb-0 lg:w-5/12 lg:order-1">
          <div className="flex lg:py-12 justify-center lg:justify-end">
            <img src={nearestEvent.banner} className="w-full lg:w-auto max-w-full rounded-lg shadow-lg dark:shadow-black/20" alt={`${nearestEvent.title} banner`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
