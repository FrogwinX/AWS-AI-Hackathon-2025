import React from 'react';
import { FaBed, FaPlus, FaTrash, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { TripDay, Activity, Transport } from '@/constants/tripStructure';
import ActivityRow from './ActivityRow';
import TransportRow from './TransportRow';
import PlaceholderRow from './PlaceholderRow';

interface DayCardProps {
  day: TripDay;
  dayIndex: number;
  editingDay: number | null;
  editingActivity: number | null;
  onAddActivity: (dayIndex: number) => void;
  onDeleteDay: (dayIndex: number) => void;
  onEditActivity: (dayIndex: number, activityIndex: number) => void;
  onSaveActivity: () => void;
  onCancelEdit: () => void;
  onRemoveActivity: (dayIndex: number, activityIndex: number) => void;
  onUpdateActivity: (dayIndex: number, activityIndex: number, field: string, value: string) => void;
  onUpdateTransport: (dayIndex: number, transportIndex: number, field: string, value: string) => void;
  editingTransport: number | null;
  onEditTransport: (dayIndex: number, transportIndex: number) => void;
  onSaveTransport: () => void;
  onCancelTransportEdit: () => void;
  editingAccommodation: number | null;
  onEditAccommodation: (dayIndex: number) => void;
  onSaveAccommodation: () => void;
  onCancelAccommodationEdit: () => void;
  onUpdateAccommodation: (dayIndex: number, field: string, value: string) => void;
  isLastDay: boolean;
  isFirstDay: boolean;
  arrivalPort?: string;
  departurePort?: string;
  canDelete: boolean;
}

const DayCard = ({
  day,
  dayIndex,
  editingDay,
  editingActivity,
  onAddActivity,
  onDeleteDay,
  onEditActivity,
  onSaveActivity,
  onCancelEdit,
  onRemoveActivity,
  onUpdateActivity,
  onUpdateTransport,
  canDelete,
  editingTransport,
  onEditTransport,
  onSaveTransport,
  onCancelTransportEdit,
  editingAccommodation,
  onEditAccommodation,
  onSaveAccommodation,
  onCancelAccommodationEdit,
  onUpdateAccommodation,
  isLastDay,
  isFirstDay,
  arrivalPort,
  departurePort
}: DayCardProps) => {
  // Check for time order errors
  const getTimeErrors = () => {
    const errors: boolean[] = [];
    for (let i = 0; i < day.activities.length; i++) {
      if (i === 0) {
        errors.push(false);
        continue;
      }
      
      const currentTime = day.activities[i].time;
      const previousTime = day.activities[i - 1].time;
      
      // Convert time strings to comparable format (HH:MM)
      const currentMinutes = timeToMinutes(currentTime);
      const previousMinutes = timeToMinutes(previousTime);
      
      errors.push(currentMinutes < previousMinutes);
    }
    return errors;
  };
  
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const timeErrors = getTimeErrors();
  return (
    <div className="border border-indigo-200 rounded-lg overflow-hidden">
      {/* Day Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">
              Day {dayIndex + 1} - {new Date(day.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-indigo-100">
              <FaBed className="text-sm" />
              {editingAccommodation === dayIndex ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={day.accommodation.name}
                    onChange={(e) => onUpdateAccommodation(dayIndex, 'name', e.target.value)}
                    className="bg-indigo-700 text-white placeholder-indigo-300 border border-indigo-500 rounded px-2 py-1 text-sm"
                    placeholder="Hotel name"
                  />
                  <input
                    type="text"
                    value={day.accommodation.address}
                    onChange={(e) => onUpdateAccommodation(dayIndex, 'address', e.target.value)}
                    className="bg-indigo-700 text-white placeholder-indigo-300 border border-indigo-500 rounded px-2 py-1 text-sm"
                    placeholder="Address"
                  />
                  <button onClick={onSaveAccommodation} className="text-green-300 hover:text-green-100">
                    <FaSave />
                  </button>
                  <button onClick={onCancelAccommodationEdit} className="text-gray-300 hover:text-gray-100">
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {isLastDay ? 'Safe travels! 🛫' : (day.accommodation.name || 'No accommodation set')}
                  </span>
                  {!isLastDay && (
                    <button onClick={() => onEditAccommodation(dayIndex)} className="text-indigo-200 hover:text-white">
                      <FaEdit className="text-xs" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddActivity(dayIndex)}
              className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded-md text-sm flex items-center gap-2 text-white"
            >
              <FaPlus /> Add Activity
            </button>
            {canDelete && (
              <button
                onClick={() => onDeleteDay(dayIndex)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm flex items-center gap-2 text-white"
              >
                <FaTrash /> Delete Day
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {/* First placeholder: Arrival on first day, Hotel on other days with activities */}
            {isFirstDay && arrivalPort ? (
              <React.Fragment>
                <PlaceholderRow
                  type="arrival"
                  text={`Arrive at ${arrivalPort}`}
                  dayIndex={dayIndex}
                />
                {day.activities.length > 0 && (
                  <TransportRow
                    transport={{
                      id: `arrival-transport-${dayIndex}`,
                      fromActivityId: 'arrival',
                      toActivityId: day.activities[0]?.id || '',
                      method: '',
                      duration: ''
                    }}
                    dayIndex={dayIndex}
                    transportIndex={-1}
                    isEditing={false}
                    onEdit={() => {}}
                    onSave={() => {}}
                    onCancel={() => {}}
                    onUpdateTransport={() => {}}
                  />
                )}
              </React.Fragment>
            ) : (!isFirstDay && day.activities.length > 0) ? (
              <React.Fragment>
                <PlaceholderRow
                  type="accommodation"
                  text={`From ${day.accommodation.name || 'hotel'}`}
                  dayIndex={dayIndex}
                />
                <TransportRow
                  transport={{
                    id: `hotel-departure-${dayIndex}`,
                    fromActivityId: `accommodation-${dayIndex}`,
                    toActivityId: day.activities[0]?.id || '',
                    method: '',
                    duration: ''
                  }}
                  dayIndex={dayIndex}
                  transportIndex={-1}
                  isEditing={false}
                  onEdit={() => {}}
                  onSave={() => {}}
                  onCancel={() => {}}
                  onUpdateTransport={() => {}}
                />
              </React.Fragment>
            ) : null}
            
            {day.activities.map((activity, activityIndex) => (
              <React.Fragment key={activityIndex}>
                <ActivityRow
                  activity={activity}
                  dayIndex={dayIndex}
                  activityIndex={activityIndex}
                  isEditing={editingDay === dayIndex && editingActivity === activityIndex}
                  onEdit={() => onEditActivity(dayIndex, activityIndex)}
                  onSave={onSaveActivity}
                  onCancel={onCancelEdit}
                  onRemove={() => onRemoveActivity(dayIndex, activityIndex)}
                  onUpdateActivity={(field, value) => onUpdateActivity(dayIndex, activityIndex, field, value)}
                  hasTimeError={timeErrors[activityIndex]}
                />
                
                {/* Transport between activities */}
                {activityIndex < day.activities.length - 1 && (() => {
                  const transport = day.transports.find(t => 
                    t.fromActivityId === activity.id && 
                    t.toActivityId === day.activities[activityIndex + 1]?.id
                  );
                  const transportIndex = day.transports.findIndex(t => t.id === transport?.id);
                  return transport ? (
                    <TransportRow
                      transport={transport}
                      dayIndex={dayIndex}
                      transportIndex={transportIndex}
                      isEditing={editingDay === dayIndex && editingTransport === transportIndex}
                      onEdit={() => onEditTransport(dayIndex, transportIndex)}
                      onSave={onSaveTransport}
                      onCancel={onCancelTransportEdit}
                      onUpdateTransport={(field, value) => onUpdateTransport(dayIndex, transportIndex, field, value)}
                    />
                  ) : null;
                })()}
                
                {/* Last activity handling */}
                {activityIndex === day.activities.length - 1 && (
                  <React.Fragment>
                    {/* Transport to final destination */}
                    {isLastDay && departurePort ? (
                      <React.Fragment>
                        <TransportRow
                          transport={{
                            id: `departure-transport-${dayIndex}`,
                            fromActivityId: activity.id,
                            toActivityId: 'departure',
                            method: '',
                            duration: ''
                          }}
                          dayIndex={dayIndex}
                          transportIndex={-1}
                          isEditing={false}
                          onEdit={() => {}}
                          onSave={() => {}}
                          onCancel={() => {}}
                          onUpdateTransport={() => {}}
                        />
                        <PlaceholderRow
                          type="departure"
                          text={`Depart from ${departurePort}`}
                          dayIndex={dayIndex}
                        />
                      </React.Fragment>
                    ) : (!isLastDay) ? (
                      <React.Fragment>
                        <TransportRow
                          transport={{
                            id: `hotel-return-${dayIndex}`,
                            fromActivityId: activity.id,
                            toActivityId: `accommodation-${dayIndex}`,
                            method: '',
                            duration: ''
                          }}
                          dayIndex={dayIndex}
                          transportIndex={-1}
                          isEditing={false}
                          onEdit={() => {}}
                          onSave={() => {}}
                          onCancel={() => {}}
                          onUpdateTransport={() => {}}
                        />
                        <PlaceholderRow
                          type="accommodation"
                          text={`Return to ${day.accommodation.name || 'hotel'}`}
                          dayIndex={dayIndex}
                        />
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
            
            {/* Handle empty days */}
            {day.activities.length === 0 && (() => {
              // Single day trip (arrival and departure same day)
              if (isFirstDay && isLastDay && arrivalPort && departurePort) {
                return (
                  <React.Fragment>
                    <TransportRow
                      transport={{
                        id: `same-day-transport-${dayIndex}`,
                        fromActivityId: 'arrival',
                        toActivityId: 'departure',
                        method: '',
                        duration: ''
                      }}
                      dayIndex={dayIndex}
                      transportIndex={-1}
                      isEditing={false}
                      onEdit={() => {}}
                      onSave={() => {}}
                      onCancel={() => {}}
                      onUpdateTransport={() => {}}
                    />
                    <PlaceholderRow
                      type="departure"
                      text={`Depart from ${departurePort}`}
                      dayIndex={dayIndex}
                    />
                  </React.Fragment>
                );
              }
              
              // First day with no activities (multi-day trip)
              if (isFirstDay && !isLastDay && arrivalPort) {
                return (
                  <React.Fragment>
                    <TransportRow
                      transport={{
                        id: `arrival-hotel-${dayIndex}`,
                        fromActivityId: 'arrival',
                        toActivityId: `accommodation-${dayIndex}`,
                        method: '',
                        duration: ''
                      }}
                      dayIndex={dayIndex}
                      transportIndex={-1}
                      isEditing={false}
                      onEdit={() => {}}
                      onSave={() => {}}
                      onCancel={() => {}}
                      onUpdateTransport={() => {}}
                    />
                    <PlaceholderRow
                      type="accommodation"
                      text={`Check in to ${day.accommodation.name || 'hotel'}`}
                      dayIndex={dayIndex}
                    />
                  </React.Fragment>
                );
              }
              
              // Last day with no activities
              if (isLastDay && !isFirstDay && departurePort) {
                return (
                  <React.Fragment>
                    <PlaceholderRow
                      type="accommodation"
                      text={`From ${day.accommodation.name || 'hotel'}`}
                      dayIndex={dayIndex}
                    />
                    <TransportRow
                      transport={{
                        id: `hotel-departure-${dayIndex}`,
                        fromActivityId: `accommodation-${dayIndex}`,
                        toActivityId: 'departure',
                        method: '',
                        duration: ''
                      }}
                      dayIndex={dayIndex}
                      transportIndex={-1}
                      isEditing={false}
                      onEdit={() => {}}
                      onSave={() => {}}
                      onCancel={() => {}}
                      onUpdateTransport={() => {}}
                    />
                    <PlaceholderRow
                      type="departure"
                      text={`Depart from ${departurePort}`}
                      dayIndex={dayIndex}
                    />
                  </React.Fragment>
                );
              }
              
              // Middle days with no activities - no placeholders
              return null;
            })()}
          </tbody>
        </table>
      </div>

      {day.activities.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <FaCalendarAlt className="mx-auto text-3xl mb-2 opacity-50" />
          <p>No activities planned for this day</p>
          <button
            onClick={() => onAddActivity(dayIndex)}
            className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Add your first activity
          </button>
        </div>
      )}
    </div>
  );
};

export default DayCard;