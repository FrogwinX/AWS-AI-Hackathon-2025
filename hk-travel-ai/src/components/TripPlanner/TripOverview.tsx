import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaBed, FaEdit, FaSave, FaTimes, FaPlus, FaPlane } from 'react-icons/fa';
import { TripPlan } from '@/constants/tripStructure';
import { HK_ENTRY_PORTS } from '@/constants/hkPorts';

interface TripOverviewProps {
  tripPlan: TripPlan;
  onUpdateTripPlan: (updates: Partial<TripPlan>) => void;
  onAddNewDay: () => void;
  onStartDateChange: (date: string) => void;
}

const TripOverview = ({ tripPlan, onUpdateTripPlan, onAddNewDay, onStartDateChange }: TripOverviewProps) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(tripPlan.title);

  const handleTitleSave = () => {
    onUpdateTripPlan({ title: tempTitle });
    setEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(tripPlan.title);
    setEditingTitle(false);
  };

  return (
    <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {editingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="text-xl font-bold text-gray-800 bg-white border border-indigo-300 rounded px-2 py-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') handleTitleCancel();
                }}
                autoFocus
              />
              <button onClick={handleTitleSave} className="text-green-600 hover:text-green-800">
                <FaSave />
              </button>
              <button onClick={handleTitleCancel} className="text-gray-600 hover:text-gray-800">
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-800">{tripPlan.title}</h2>
              <button
                onClick={() => {
                  setTempTitle(tripPlan.title);
                  setEditingTitle(true);
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FaEdit />
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-indigo-600" />
            <span>{tripPlan.days.length} days</span>
          </div>
          {tripPlan.days.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium whitespace-nowrap">Date:</label>
              <input
                type="date"
                value={tripPlan.startDate || ''}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="px-2 py-1 border border-indigo-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <FaPlane className="text-green-600 flex-shrink-0" />
            <label className="text-gray-700 font-medium whitespace-nowrap">Arrival:</label>
            <select
              value={tripPlan.arrivalPort || ''}
              onChange={(e) => onUpdateTripPlan({ arrivalPort: e.target.value })}
              className="px-2 py-1 border border-indigo-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs min-w-0 flex-1"
            >
              <option value="">Select</option>
              {HK_ENTRY_PORTS.map(port => (
                <option key={port} value={port}>{port}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <FaPlane className="text-red-600 transform rotate-180 flex-shrink-0" />
            <label className="text-gray-700 font-medium whitespace-nowrap">Departure:</label>
            <select
              value={tripPlan.departurePort || ''}
              onChange={(e) => onUpdateTripPlan({ departurePort: e.target.value })}
              className="px-2 py-1 border border-indigo-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs min-w-0 flex-1"
            >
              <option value="">Select</option>
              {HK_ENTRY_PORTS.map(port => (
                <option key={port} value={port}>{port}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {tripPlan.startDate && tripPlan.endDate && (
        <div className="text-center text-sm text-gray-500 mb-2">
          {tripPlan.startDate} to {tripPlan.endDate}
        </div>
      )}
      
      {tripPlan.days.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-indigo-600" />
            <span>Duration: {tripPlan.days.length} days</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-600" />
            <span>Destination: Hong Kong</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBed className="text-indigo-600" />
            <span>Accommodations: {new Set(tripPlan.days.map(d => d.accommodation.name).filter(name => name)).size} hotels</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <FaCalendarAlt className="mx-auto text-4xl mb-4 opacity-50" />
          <p className="text-lg mb-2">No trip planned yet</p>
          <p className="text-sm mb-4">Start chatting with the AI to create your Hong Kong itinerary!</p>
          <button
            onClick={onAddNewDay}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto"
          >
            <FaPlus /> Add First Day
          </button>
        </div>
      )}
    </div>
  );
};

export default TripOverview;