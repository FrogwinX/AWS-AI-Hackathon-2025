import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { TripPlan } from '@/contexts/TripPlanContext';

interface DeleteConfirmModalProps {
  dayIndex: number;
  tripPlan: TripPlan;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({ dayIndex, tripPlan, onConfirm, onCancel }: DeleteConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <FaTrash className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Delete Day</h3>
            <p className="text-sm text-gray-600">This action cannot be undone</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete Day {dayIndex + 1} 
          ({new Date(tripPlan.days[dayIndex].date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })})? 
          All activities for this day will be permanently removed.
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium flex items-center gap-2"
          >
            <FaTrash /> Delete Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;