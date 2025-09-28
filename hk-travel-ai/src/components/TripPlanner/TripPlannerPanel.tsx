'use client';

import React, { useState } from 'react';
import { TravelGuideProps } from '@/constants/travel';
import { useTripPlan, TripDay } from '@/contexts/TripPlanContext';
import { FaPlus } from 'react-icons/fa';
import TripHeader from './TripHeader';
import TripOverview from './TripOverview';
import DayCard from './DayCard';
import DeleteConfirmModal from './DeleteConfirmModal';

const TripPlannerPanel = ({ isActive, selectedGuide }: { isActive: boolean, selectedGuide: TravelGuideProps }) => {
  const { tripPlan, addActivity, updateActivity, removeActivity, addDay, removeDay, updateTripPlan } = useTripPlan();

  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editingActivity, setEditingActivity] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const addNewDay = () => {
    let newDate: Date;
    if (tripPlan.days.length === 0) {
      // First day - use today or start date if available
      newDate = tripPlan.startDate ? new Date(tripPlan.startDate) : new Date();
    } else {
      // Additional days - use last day + 1
      const lastDay = tripPlan.days[tripPlan.days.length - 1];
      newDate = new Date(lastDay.date);
      newDate.setDate(newDate.getDate() + 1);
    }
    
    const newDay: TripDay = {
      date: newDate.toISOString().split('T')[0],
      accommodation: {
        name: "",
        address: ""
      },
      activities: []
    };
    
    addDay(newDay);
  };

  const addNewActivity = (dayIndex: number) => {
    const newActivity = {
      time: "09:00",
      location: "",
      activity: "",
      duration: "1 hour",
      transport: {
        method: "MTR",
        duration: "30 minutes",
        cost: "HK$10"
      }
    };

    addActivity(dayIndex, newActivity);
  };

  const handleRemoveActivity = (dayIndex: number, activityIndex: number) => {
    removeActivity(dayIndex, activityIndex);
  };

  const handleUpdateActivity = (dayIndex: number, activityIndex: number, field: string, value: string) => {
    updateActivity(dayIndex, activityIndex, { [field]: value });
  };

  const updateTransport = (dayIndex: number, activityIndex: number, field: string, value: string) => {
    const currentActivity = tripPlan.days[dayIndex].activities[activityIndex];
    updateActivity(dayIndex, activityIndex, {
      transport: {
        ...currentActivity.transport!,
        [field]: value
      }
    });
  };

  const handleStartDateChange = (newStartDate: string) => {
    if (!newStartDate || tripPlan.days.length === 0) {
      updateTripPlan({ startDate: newStartDate });
      return;
    }

    // Recalculate all day dates based on new start date
    const startDate = new Date(newStartDate);
    const updatedDays = tripPlan.days.map((day, index) => {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + index);
      return {
        ...day,
        date: newDate.toISOString().split('T')[0]
      };
    });

    // Calculate end date
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + tripPlan.days.length - 1);

    updateTripPlan({ 
      startDate: newStartDate,
      endDate: endDate.toISOString().split('T')[0],
      days: updatedDays
    });
  };

  return (
    <div className={`flex-3 bg-white h-full rounded-xl shadow-lg flex flex-col overflow-hidden ${isActive ? 'flex' : 'hidden'}`}>
      <TripHeader />
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <TripOverview 
          tripPlan={tripPlan}
          onUpdateTripPlan={updateTripPlan}
          onAddNewDay={addNewDay}
          onStartDateChange={handleStartDateChange}
        />

        {/* Daily Itinerary */}
        {tripPlan.days.length > 0 && (
          <div className="space-y-6">
            {tripPlan.days.map((day, dayIndex) => (
              <DayCard
                key={dayIndex}
                day={day}
                dayIndex={dayIndex}
                editingDay={editingDay}
                editingActivity={editingActivity}
                onAddActivity={addNewActivity}
                onDeleteDay={(index) => setShowDeleteConfirm(index)}
                onEditActivity={(dayIdx, activityIdx) => {
                  setEditingDay(dayIdx);
                  setEditingActivity(activityIdx);
                }}
                onSaveActivity={() => {
                  setEditingDay(null);
                  setEditingActivity(null);
                }}
                onCancelEdit={() => {
                  setEditingDay(null);
                  setEditingActivity(null);
                }}
                onRemoveActivity={handleRemoveActivity}
                onUpdateActivity={handleUpdateActivity}
                onUpdateTransport={updateTransport}
                canDelete={tripPlan.days.length > 1}
              />
            ))}
          </div>
        )}

        {/* Add New Day Button */}
        {tripPlan.days.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={addNewDay}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto"
            >
              <FaPlus /> Add New Day
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm !== null && (
          <DeleteConfirmModal
            dayIndex={showDeleteConfirm}
            tripPlan={tripPlan}
            onConfirm={() => {
              removeDay(showDeleteConfirm);
              setShowDeleteConfirm(null);
            }}
            onCancel={() => setShowDeleteConfirm(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TripPlannerPanel;