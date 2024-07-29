import React from 'react';

// Utility function to get the number of days in a given month and year
function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// DateSelector component
function DateSelector({ selectedDate, onSelectDate, month, year }) {
  // Get the number of days in the specified month and year
  const daysInMonth = getDaysInMonth(month, year);

  return (
    <div className="grid grid-cols-7 gap-1 mt-2 text-center">
      {/* Generate a grid of days for the given month */}
      {[...Array(daysInMonth)].map((_, i) => {
        const date = i + 1; // Day of the month (1-based)
        const isSelected = selectedDate === date; // Check if this day is selected

        return (
          <div
            key={i} // Unique key for each day
            className={`py-1 cursor-pointer rounded-md ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}
            onClick={() => onSelectDate(date)} // Trigger onSelectDate when clicked
          >
            {date} {/* Display the day of the month */}
          </div>
        );
      })}
    </div>
  );
}

export default DateSelector;
