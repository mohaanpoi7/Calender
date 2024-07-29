import React from 'react';

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function DateSelector({ selectedDate, onSelectDate, month, year }) {
  const daysInMonth = getDaysInMonth(month, year);

  return (
    <div className="grid grid-cols-7 gap-1 mt-2 text-center">
      {[...Array(daysInMonth)].map((_, i) => {
        const date = i + 1;
        const isSelected = selectedDate === date;
        return (
          <div
            key={i}
            className={py-1 cursor-pointer rounded-md ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}}
            onClick={() => onSelectDate(date)}
          >
            {date}
          </div>
        );
      })}
    </div>
  );
}

export default DateSelector;