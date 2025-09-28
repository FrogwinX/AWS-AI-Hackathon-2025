import React from 'react';
import { FaClock, FaMapMarkerAlt, FaRoute, FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { TripDay } from '@/contexts/TripPlanContext';

interface ActivityRowProps {
  activity: TripDay['activities'][0];
  dayIndex: number;
  activityIndex: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onRemove: () => void;
  onUpdateActivity: (field: string, value: string) => void;
  onUpdateTransport: (field: string, value: string) => void;
}

const ActivityRow = ({
  activity,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onRemove,
  onUpdateActivity,
  onUpdateTransport
}: ActivityRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <FaClock className="text-gray-400 text-sm" />
          {isEditing ? (
            <input
              type="time"
              value={activity.time}
              onChange={(e) => onUpdateActivity('time', e.target.value)}
              className="border rounded px-2 py-1 text-sm w-20"
            />
          ) : (
            <span className="text-sm font-medium text-gray-900">{activity.time}</span>
          )}
        </div>
      </td>
      
      <td className="px-4 py-4">
        {isEditing ? (
          <input
            type="text"
            value={activity.location}
            onChange={(e) => onUpdateActivity('location', e.target.value)}
            className="border rounded px-2 py-1 text-sm w-full"
            placeholder="Location"
          />
        ) : (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-500 text-sm" />
            <span className="text-sm text-gray-900">{activity.location}</span>
          </div>
        )}
      </td>
      
      <td className="px-4 py-4">
        {isEditing ? (
          <textarea
            value={activity.activity}
            onChange={(e) => onUpdateActivity('activity', e.target.value)}
            className="border rounded px-2 py-1 text-sm w-full h-16 resize-none"
            placeholder="Activity description"
          />
        ) : (
          <span className="text-sm text-gray-900">{activity.activity}</span>
        )}
      </td>
      
      <td className="px-4 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="text"
            value={activity.duration}
            onChange={(e) => onUpdateActivity('duration', e.target.value)}
            className="border rounded px-2 py-1 text-sm w-20"
            placeholder="Duration"
          />
        ) : (
          <span className="text-sm text-gray-600">{activity.duration}</span>
        )}
      </td>
      
      <td className="px-4 py-4">
        {activity.transport && (
          <div className="text-sm">
            {isEditing ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={activity.transport.method}
                  onChange={(e) => onUpdateTransport('method', e.target.value)}
                  className="border rounded px-2 py-1 text-xs w-full"
                  placeholder="Method"
                />
                <input
                  type="text"
                  value={activity.transport.duration}
                  onChange={(e) => onUpdateTransport('duration', e.target.value)}
                  className="border rounded px-2 py-1 text-xs w-full"
                  placeholder="Duration"
                />
                <input
                  type="text"
                  value={activity.transport.cost || ''}
                  onChange={(e) => onUpdateTransport('cost', e.target.value)}
                  className="border rounded px-2 py-1 text-xs w-full"
                  placeholder="Cost"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaRoute className="text-blue-500 text-sm" />
                <div>
                  <div className="font-medium text-gray-900">{activity.transport.method}</div>
                  <div className="text-gray-500 text-xs">{activity.transport.duration}</div>
                  {activity.transport.cost && (
                    <div className="text-green-600 text-xs font-medium">{activity.transport.cost}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </td>
      
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button onClick={onSave} className="text-green-600 hover:text-green-800">
                <FaSave />
              </button>
              <button onClick={onCancel} className="text-gray-600 hover:text-gray-800">
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
                <FaEdit />
              </button>
              <button onClick={onRemove} className="text-red-600 hover:text-red-800">
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ActivityRow;