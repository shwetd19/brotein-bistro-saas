import React, { useEffect, useState } from "react";
import SideBarClient from "../components/SideBarClient";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace '/api/getAllevents' with the actual API endpoint
    fetch("/api/events/getAllevents")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SideBarClient />
      <div className="pt-20 p-2 w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Healthy Weight Loss/Gain/Maintenance
          </h1>
          <p className="text-xl mb-4">
            About majorly eating right food (not referring to vegetables &
            fruits only) and not compromising on your taste buds.
          </p>
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join Us Today!
          </button> */}
        </div>
        {events.map((event) => (
          <div
            key={event._id}
            className="max-w-sm rounded overflow-hidden shadow-lg m-2 bg-white"
          >
            <img
              className="w-full"
              src={event.eventPoster}
              alt={event.eventName}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{event.eventName}</div>
              <p className="text-gray-700 text-base">{event.eventDate}</p>
              <p className="text-gray-700 text-base">{event.eventLocation}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Featured
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
