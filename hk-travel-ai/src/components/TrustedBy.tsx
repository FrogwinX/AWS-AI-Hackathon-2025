import React from 'react';
import { CLIENTS } from '../constants/trustedByInfo';
import { FaBuilding } from 'react-icons/fa';

const TrustedBy = () => {

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full">
      <div className="flex items-center gap-3 text-blue-900 mb-3 sm:mb-4">
        <FaBuilding className="text-lg sm:text-xl text-teal-400" />
        <h3 className="text-base sm:text-lg font-bold">Trusted By</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {CLIENTS.map((client, index) => (
          <a
            key={index}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 border border-gray-200 rounded-lg h-20 sm:h-24 flex items-center justify-center p-1 sm:p-2 transition-all hover:shadow-sm hover:border-blue-200"
          >
            <img
              src={client.image}
              alt={client.alt}
              className={`max-h-full max-w-full p-3 sm:p-1 object-contain ${client.size}`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;
