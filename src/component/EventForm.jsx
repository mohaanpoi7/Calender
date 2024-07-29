import React, { useState } from 'react';

// EventForm component
const EventForm = ({ events, setEvents }) => {
  // State for storing the new event details
  const [newEvent, setNewEvent] = useState({ date: '', title: '' });
  
  // State for storing the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Handler function to add a new event
  const handleAddEvent = () => {
    // Add new event to the events array
    setEvents([...events, { date: new Date(newEvent.date), title: newEvent.title }]);
    // Clear the new event form
    setNewEvent({ date: '', title: '' });
  };

  // Filter events based on the search query
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-80">
      {/* Form to add a new event */}
      <h3 className="text-xl mb-4">Add New Event</h3>
      <input
        type="date"
        value={newEvent.date}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        className="w-full p-2 mb-2 text-black"
      />
      <input
        type="text"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        placeholder="Event Title"
        className="w-full p-2 mb-4 text-black"
      />
      <button
        onClick={handleAddEvent}
        className="bg-green-500 px-4 py-2 rounded text-white w-full"
      >
        Save Event
      </button>

      {/* Section for searching events */}
      <h3 className="text-xl mt-6 mb-2">Search Events</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="w-full p-2 mb-2 text-black"
      />
      <ul className="list-disc ml-5">
        {/* List of filtered events */}
        {filteredEvents.map((event, index) => (
          <li key={index} className="mb-1">
            {event.date.toDateString()}: {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventForm;
