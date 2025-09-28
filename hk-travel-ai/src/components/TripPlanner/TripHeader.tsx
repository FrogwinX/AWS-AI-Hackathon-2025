import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const TripHeader = () => {
  return (
    <div className="bg-indigo-600 text-white px-4 sm:px-6 py-3 sm:py-4">
      <div className="text-base sm:text-lg font-bold flex items-center gap-2">
        <FaCalendarAlt />
        Trip Planner
      </div>
    </div>
  );
};

export default TripHeader;