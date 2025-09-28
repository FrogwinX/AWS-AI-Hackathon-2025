'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TripDay {
  date: string;
  accommodation: {
    name: string;
    address: string;
    checkIn?: string;
    checkOut?: string;
  };
  activities: {
    time: string;
    location: string;
    activity: string;
    duration: string;
    transport?: {
      method: string;
      duration: string;
      cost?: string;
      notes?: string;
    };
  }[];
}

export interface TripPlan {
  title: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  days: TripDay[];
}

interface TripPlanContextType {
  tripPlan: TripPlan;
  updateTripPlan: (newPlan: Partial<TripPlan>) => void;
  addActivity: (dayIndex: number, activity: TripDay['activities'][0]) => void;
  updateActivity: (dayIndex: number, activityIndex: number, updates: Partial<TripDay['activities'][0]>) => void;
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
  days: []
};

export const TripPlanProvider = ({ children }: { children: ReactNode }) => {
  const [tripPlan, setTripPlan] = useState<TripPlan>(initialTripPlan);

  const updateTripPlan = (newPlan: Partial<TripPlan>) => {
    setTripPlan(prev => {
      const updated = { ...prev, ...newPlan };
      // Recalculate totalDays based on actual days array
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

  const addActivity = (dayIndex: number, activity: TripDay['activities'][0]) => {
    setTripPlan(prev => ({
      ...prev,
      days: prev.days.map((day, index) => 
        index === dayIndex 
          ? { ...day, activities: [...day.activities, activity] }
          : day
      )
    }));
  };

  const updateActivity = (dayIndex: number, activityIndex: number, updates: Partial<TripDay['activities'][0]>) => {
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
    setTripPlan(prev => ({
      ...prev,
      days: prev.days.map((day, index) => 
        index === dayIndex 
          ? { ...day, activities: day.activities.filter((_, i) => i !== activityIndex) }
          : day
      )
    }));
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
    // Ensure response is a string
    if (!response || typeof response !== 'string') {
      return;
    }
    
    const lowerResponse = response.toLowerCase();
    
    // Only update trip plan if the response contains trip planning keywords
    const planningKeywords = ['itinerary', 'plan', 'schedule', 'day 1', 'day 2', 'visit', 'trip'];
    const hasPlanningContent = planningKeywords.some(keyword => lowerResponse.includes(keyword));
    
    if (!hasPlanningContent) {
      return; // Don't modify trip plan for general travel questions
    }
    
    // If this is the first planning response and we have no days, create initial structure
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
        activities: []
      };
      
      addDay(firstDay);
    }
    
    const timePattern = /(?:at\s+)?(\d{1,2}):?(\d{2})?\s*(am|pm)?/gi;
    const timeMatches = response.match(timePattern);
    
    const locations = ['victoria peak', 'tsim sha tsui', 'central', 'mong kok', 'causeway bay', 'wan chai', 'temple street', 'ladies market', 'symphony of lights'];
    
    locations.forEach(location => {
      if (lowerResponse.includes(location)) {
        const newActivity = {
          time: timeMatches ? timeMatches[0] : "10:00",
          location: location.charAt(0).toUpperCase() + location.slice(1),
          activity: `Visit ${location}`,
          duration: "2 hours",
          transport: {
            method: "MTR",
            duration: "30 minutes",
            cost: "HK$15"
          }
        };
        
        // Add to the last day or first day if available
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