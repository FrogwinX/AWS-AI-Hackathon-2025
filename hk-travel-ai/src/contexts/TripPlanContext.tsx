'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TripDay, TripPlan, Activity, Transport } from '../constants/tripStructure';

interface TripPlanContextType {
  tripPlan: TripPlan;
  updateTripPlan: (newPlan: Partial<TripPlan>) => void;
  addActivity: (dayIndex: number, activity: Activity) => void;
  updateActivity: (dayIndex: number, activityIndex: number, updates: Partial<Activity>) => void;
  removeActivity: (dayIndex: number, activityIndex: number) => void;
  addDay: (day: TripDay) => void;
  removeDay: (dayIndex: number) => void;
  updateAccommodation: (dayIndex: number, accommodation: Partial<TripDay['accommodation']>) => void;
  parseChatResponse: (response: string) => void;
}

const TripPlanContext = createContext<TripPlanContextType | undefined>(undefined);

const initialTripPlan: TripPlan = {
  title: "My Hong Kong Trip",
  startDate: "",
  endDate: "",
  totalDays: 0,
  days: [],
  arrivalPort: "Hong Kong International Airport",
  departurePort: "Hong Kong International Airport"
};

export const TripPlanProvider = ({ children }: { children: ReactNode }) => {
  const [tripPlan, setTripPlan] = useState<TripPlan>(initialTripPlan);

  const updateTripPlan = (newPlan: Partial<TripPlan>) => {
    setTripPlan(prev => {
      const updated = { ...prev, ...newPlan };
      if (updated.days) {
        updated.totalDays = updated.days.length;
        if (updated.days.length > 0) {
          updated.startDate = updated.days[0].date;
          updated.endDate = updated.days[updated.days.length - 1].date;
        }
      }
      return updated;
    });
  };

  const addActivity = (dayIndex: number, activity: Activity) => {
    setTripPlan(prev => {
      const updatedDays = prev.days.map((day, index) => {
        if (index === dayIndex) {
          const newActivities = [...day.activities, activity];
          const newTransports = [...day.transports];
          
          // Add transport from previous activity or accommodation
          if (day.activities.length > 0) {
            const lastActivity = day.activities[day.activities.length - 1];
            const newTransport: Transport = {
              id: `transport-${Date.now()}-${Math.random()}`,
              fromActivityId: lastActivity.id,
              toActivityId: activity.id,
              method: "",
              duration: ""
            };
            newTransports.push(newTransport);
          } else if (index > 0 && day.accommodation.name) {
            // First activity of the day - transport from accommodation
            const accommodationId = `accommodation-${index}`;
            const newTransport: Transport = {
              id: `transport-${Date.now()}-${Math.random()}`,
              fromActivityId: accommodationId,
              toActivityId: activity.id,
              method: "",
              duration: ""
            };
            newTransports.push(newTransport);
          }
          
          // Add transport to accommodation if this is the last activity and not the last day
          if (index < prev.days.length - 1 && day.accommodation.name) {
            const accommodationId = `accommodation-${index}`;
            const toAccommodationTransport: Transport = {
              id: `transport-${Date.now()}-${Math.random() + 1}`,
              fromActivityId: activity.id,
              toActivityId: accommodationId,
              method: "",
              duration: ""
            };
            newTransports.push(toAccommodationTransport);
          }
          
          return { ...day, activities: newActivities, transports: newTransports };
        }
        return day;
      });
      
      return { ...prev, days: updatedDays };
    });
  };

  const updateActivity = (dayIndex: number, activityIndex: number, updates: Partial<Activity>) => {
    setTripPlan(prev => ({
      ...prev,
      days: prev.days.map((day, dIndex) => 
        dIndex === dayIndex 
          ? {
              ...day,
              activities: day.activities.map((activity, aIndex) => 
                aIndex === activityIndex 
                  ? { ...activity, ...updates }
                  : activity
              )
            }
          : day
      )
    }));
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    setTripPlan(prev => {
      const updatedDays = prev.days.map((day, index) => {
        if (index === dayIndex) {
          const activityToRemove = day.activities[activityIndex];
          const newActivities = day.activities.filter((_, i) => i !== activityIndex);
          const newTransports = day.transports.filter(t => 
            t.fromActivityId !== activityToRemove.id && t.toActivityId !== activityToRemove.id
          );
          
          return { ...day, activities: newActivities, transports: newTransports };
        }
        return day;
      });
      
      return { ...prev, days: updatedDays };
    });
  };

  const addDay = (day: TripDay) => {
    setTripPlan(prev => {
      const newDays = [...prev.days, day];
      return {
        ...prev,
        days: newDays,
        totalDays: newDays.length,
        startDate: newDays[0]?.date || day.date,
        endDate: day.date
      };
    });
  };

  const removeDay = (dayIndex: number) => {
    setTripPlan(prev => {
      const newDays = prev.days.filter((_, index) => index !== dayIndex);
      return {
        ...prev,
        days: newDays,
        totalDays: newDays.length,
        startDate: newDays[0]?.date || '',
        endDate: newDays[newDays.length - 1]?.date || ''
      };
    });
  };

  const updateAccommodation = (dayIndex: number, accommodation: Partial<TripDay['accommodation']>) => {
    setTripPlan(prev => ({
      ...prev,
      days: prev.days.map((day, index) => 
        index === dayIndex 
          ? { ...day, accommodation: { ...day.accommodation, ...accommodation } }
          : day
      )
    }));
  };

  const parseChatResponse = (response: string) => {
    if (!response || typeof response !== 'string') {
      return;
    }
    
    const lowerResponse = response.toLowerCase();
    const planningKeywords = ['itinerary', 'plan', 'schedule', 'day 1', 'day 2', 'visit', 'trip'];
    const hasPlanningContent = planningKeywords.some(keyword => lowerResponse.includes(keyword));
    
    if (!hasPlanningContent) {
      return;
    }
    
    if (tripPlan.days.length === 0) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      const firstDay: TripDay = {
        date: tomorrow.toISOString().split('T')[0],
        accommodation: {
          name: "",
          address: ""
        },
        activities: [],
        transports: []
      };
      
      addDay(firstDay);
    }
    
    const timePattern = /(?:at\s+)?(\d{1,2}):?(\d{2})?\s*(am|pm)?/gi;
    const timeMatches = response.match(timePattern);
    
    const locations = ['victoria peak', 'tsim sha tsui', 'central', 'mong kok', 'causeway bay', 'wan chai', 'temple street', 'ladies market', 'symphony of lights'];
    
    locations.forEach(location => {
      if (lowerResponse.includes(location)) {
        const newActivity: Activity = {
          id: `activity-${Date.now()}-${Math.random()}`,
          time: timeMatches ? timeMatches[0] : "10:00",
          location: location.charAt(0).toUpperCase() + location.slice(1),
          activity: `Visit ${location}`,
          duration: "2 hours",
          type: 'activity'
        };
        
        const dayIndex = Math.max(0, tripPlan.days.length - 1);
        addActivity(dayIndex, newActivity);
      }
    });
    
    if (lowerResponse.includes('hotel') || lowerResponse.includes('stay') || lowerResponse.includes('accommodation')) {
      const hotelPattern = /(?:stay at|hotel|accommodation)[\s\w]*([A-Z][a-z\s]+(?:Hotel|Inn|Resort))/gi;
      const hotelMatch = response.match(hotelPattern);
      
      if (hotelMatch && tripPlan.days.length > 0) {
        updateAccommodation(0, {
          name: hotelMatch[0],
          address: "Hong Kong"
        });
      }
    }
  };

  const value: TripPlanContextType = {
    tripPlan,
    updateTripPlan,
    addActivity,
    updateActivity,
    removeActivity,
    addDay,
    removeDay,
    updateAccommodation,
    parseChatResponse
  };

  return (
    <TripPlanContext.Provider value={value}>
      {children}
    </TripPlanContext.Provider>
  );
};

export const useTripPlan = () => {
  const context = useContext(TripPlanContext);
  if (context === undefined) {
    throw new Error('useTripPlan must be used within a TripPlanProvider');
  }
  return context;
};