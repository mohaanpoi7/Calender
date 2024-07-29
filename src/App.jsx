import React, { useState, useEffect } from 'react';
import DateSelector from './component/DateSelector';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './component/About';
import Header from './component/Header';
import Footer from './component/Footer';

const initialEvents = [
  // { id: 1, date: 'July 22, 2024', time: '00:00', title: '' },
  // { id: 2, date: 'July 24, 2024', time: '00:00', title: 'lol' },
  // { id: 3, date: 'August 3, 2024', time: '03:03', title: 'aroosa' },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function Calendar() {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ date: '', time: '', title: '' });
  const [editEvent, setEditEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Load events from local storage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  // Save events to local storage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.time && newEvent.title) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ date: '', time: '', title: '' });
    }
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
  };

  const handleSaveEdit = () => {
    setEvents(events.map(event => (event.id === editEvent.id ? editEvent : event)));
    setEditEvent(null);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleSelectDate = (date) => {
    const monthYear = `${months[currentMonth]}, ${currentYear}`;
    setNewEvent({ ...newEvent, date: `${monthYear} ${date}` });
    setSelectedDate(date);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-5">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">CALENDAR</h2>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <button className="focus:outline-none" onClick={handlePrevMonth}>
              <span className="text-gray-400 text-2xl">&lt;</span>
            </button>
            <div className="text-xl font-bold">
              {months[currentMonth]}, {currentYear}
            </div>
            <button className="focus:outline-none" onClick={handleNextMonth}>
              <span className="text-gray-400 text-2xl">&gt;</span>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mt-4 text-center text-gray-400">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <DateSelector
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            month={currentMonth}
            year={currentYear}
          />
        </div>
        <div className="space-y-2 mb-4">
          {events.map(event => (
            <div key={event.id} className="bg-blue-600 rounded-md p-2 flex justify-between items-center">
              <div>
                <div className="text-sm">{event.date}</div>
                <div className="font-bold">{event.time}</div>
              </div>
              <div className="flex items-center">
                <div className="mr-2">{event.title}</div>
                <button className="focus:outline-none" onClick={() => handleEditEvent(event)}>
                  <span className="text-white">✏</span>
                </button>
                <button className="ml-2 focus:outline-none" onClick={() => handleDeleteEvent(event.id)}>
                  <span className="text-white">❌</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Time (e.g. 00:00)"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
            />
            <button className="p-2 bg-green-600 rounded-md text-white" onClick={handleAddEvent}>
              Add
            </button>
          </div>
          {editEvent && (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Date"
                value={editEvent.date}
                onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Time"
                value={editEvent.time}
                onChange={(e) => setEditEvent({ ...editEvent, time: e.target.value })}
                className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Title"
                value={editEvent.title}
                onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
                className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
              />
              <button className="p-2 bg-blue-600 rounded-md text-white" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="p-2 bg-red-600 rounded-md text-white" onClick={() => setEditEvent(null)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Router>
      <Calendar />
      <Footer />
    </div>
  );
}

export default App;
