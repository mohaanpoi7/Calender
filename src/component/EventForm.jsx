import React, { useState } from 'react';

const EventForm = ({ events, setEvents }) => {
  const [newEvent, setNewEvent] = useState({ date: '', title: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddEvent = () => {
    setEvents([...events, { date: new Date(newEvent.date), title: newEvent.title }]);
    setNewEvent({ date: '', title: '' });
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-80">
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

      <h3 className="text-xl mt-6 mb-2">Search Events</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="w-full p-2 mb-2 text-black"
      />
      <ul className="list-disc ml-5">
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
