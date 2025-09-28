import React from 'react';
import { FaBed, FaPlus, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { TripDay } from '@/contexts/TripPlanContext';
import ActivityRow from './ActivityRow';

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
  onUpdateTransport: (dayIndex: number, activityIndex: number, field: string, value: string) => void;
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
  canDelete
}: DayCardProps) => {
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
              <span className="text-sm">{day.accommodation.name || 'No accommodation set'}</span>
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transport</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {day.activities.map((activity, activityIndex) => (
              <ActivityRow
                key={activityIndex}
                activity={activity}
                dayIndex={dayIndex}
                activityIndex={activityIndex}
                isEditing={editingDay === dayIndex && editingActivity === activityIndex}
                onEdit={() => onEditActivity(dayIndex, activityIndex)}
                onSave={onSaveActivity}
                onCancel={onCancelEdit}
                onRemove={() => onRemoveActivity(dayIndex, activityIndex)}
                onUpdateActivity={(field, value) => onUpdateActivity(dayIndex, activityIndex, field, value)}
                onUpdateTransport={(field, value) => onUpdateTransport(dayIndex, activityIndex, field, value)}
              />
            ))}
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