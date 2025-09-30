import { TripPlan } from './tripStructure';

export const sampleHongKongTrip: TripPlan = {
  title: "3-Day Hong Kong Adventure",
  startDate: "2025-02-15",
  endDate: "2025-02-17",
  totalDays: 3,
  arrivalPort: "Hong Kong International Airport",
  departurePort: "Hong Kong International Airport",
  days: [
    {
      date: "2025-02-15",
      accommodation: {
        name: "The Peninsula Hong Kong",
        address: "Salisbury Road, Tsim Sha Tsui, Kowloon",
        checkIn: "15:00",
        checkOut: "12:00"
      },
      activities: [
        {
          id: "activity-1-1",
          time: "10:00",
          location: "Hong Kong International Airport",
          activity: "Arrival and Airport Express to Central",
          duration: "1 hour",
          type: "departure"
        },
        {
          id: "activity-1-2",
          time: "12:00",
          location: "Central District",
          activity: "Lunch at Maxim's Palace for Dim Sum",
          duration: "1.5 hours",
          type: "activity"
        },
        {
          id: "activity-1-3",
          time: "15:00",
          location: "The Peninsula Hong Kong",
          activity: "Hotel Check-in",
          duration: "30 minutes",
          type: "accommodation"
        },
        {
          id: "activity-1-4",
          time: "16:00",
          location: "Tsim Sha Tsui Promenade",
          activity: "Walk along the waterfront and enjoy harbor views",
          duration: "2 hours",
          type: "activity"
        },
        {
          id: "activity-1-5",
          time: "20:00",
          location: "Symphony of Lights",
          activity: "Watch the Symphony of Lights show",
          duration: "30 minutes",
          type: "activity"
        }
      ],
      transports: [
        {
          id: "transport-1-1",
          fromActivityId: "activity-1-1",
          toActivityId: "activity-1-2",
          method: "Airport Express + MTR",
          duration: "45 minutes"
        },
        {
          id: "transport-1-2",
          fromActivityId: "activity-1-2",
          toActivityId: "activity-1-3",
          method: "MTR + Walking",
          duration: "30 minutes"
        },
        {
          id: "transport-1-3",
          fromActivityId: "activity-1-3",
          toActivityId: "activity-1-4",
          method: "Walking",
          duration: "5 minutes"
        },
        {
          id: "transport-1-4",
          fromActivityId: "activity-1-4",
          toActivityId: "activity-1-5",
          method: "Walking",
          duration: "10 minutes"
        }
      ]
    },
    {
      date: "2025-02-16",
      accommodation: {
        name: "The Peninsula Hong Kong",
        address: "Salisbury Road, Tsim Sha Tsui, Kowloon"
      },
      activities: [
        {
          id: "activity-2-1",
          time: "09:00",
          location: "Victoria Peak",
          activity: "Take Peak Tram to Victoria Peak for panoramic views",
          duration: "3 hours",
          type: "activity"
        },
        {
          id: "activity-2-2",
          time: "13:00",
          location: "Central District",
          activity: "Lunch at a local restaurant",
          duration: "1 hour",
          type: "activity"
        },
        {
          id: "activity-2-3",
          time: "15:00",
          location: "Man Mo Temple",
          activity: "Visit historic Man Mo Temple",
          duration: "1 hour",
          type: "activity"
        },
        {
          id: "activity-2-4",
          time: "17:00",
          location: "Ladies' Market",
          activity: "Shopping at Ladies' Market in Mong Kok",
          duration: "2 hours",
          type: "activity"
        },
        {
          id: "activity-2-5",
          time: "20:00",
          location: "Temple Street Night Market",
          activity: "Dinner and night market exploration",
          duration: "2 hours",
          type: "activity"
        }
      ],
      transports: [
        {
          id: "transport-2-1",
          fromActivityId: "accommodation-1",
          toActivityId: "activity-2-1",
          method: "MTR + Peak Tram",
          duration: "45 minutes"
        },
        {
          id: "transport-2-2",
          fromActivityId: "activity-2-1",
          toActivityId: "activity-2-2",
          method: "Peak Tram + Walking",
          duration: "30 minutes"
        },
        {
          id: "transport-2-3",
          fromActivityId: "activity-2-2",
          toActivityId: "activity-2-3",
          method: "Tram",
          duration: "15 minutes"
        },
        {
          id: "transport-2-4",
          fromActivityId: "activity-2-3",
          toActivityId: "activity-2-4",
          method: "MTR",
          duration: "20 minutes"
        },
        {
          id: "transport-2-5",
          fromActivityId: "activity-2-4",
          toActivityId: "activity-2-5",
          method: "Walking",
          duration: "10 minutes"
        }
      ]
    },
    {
      date: "2025-02-17",
      accommodation: {
        name: "The Peninsula Hong Kong",
        address: "Salisbury Road, Tsim Sha Tsui, Kowloon",
        checkOut: "12:00"
      },
      activities: [
        {
          id: "activity-3-1",
          time: "09:00",
          location: "Wong Tai Sin Temple",
          activity: "Visit Wong Tai Sin Temple for good fortune",
          duration: "1.5 hours",
          type: "activity"
        },
        {
          id: "activity-3-2",
          time: "11:30",
          location: "The Peninsula Hong Kong",
          activity: "Hotel Check-out and luggage storage",
          duration: "30 minutes",
          type: "accommodation"
        },
        {
          id: "activity-3-3",
          time: "13:00",
          location: "Causeway Bay",
          activity: "Last-minute shopping and lunch",
          duration: "2 hours",
          type: "activity"
        },
        {
          id: "activity-3-4",
          time: "16:00",
          location: "Hong Kong International Airport",
          activity: "Departure via Airport Express",
          duration: "1 hour",
          type: "departure"
        }
      ],
      transports: [
        {
          id: "transport-3-1",
          fromActivityId: "accommodation-2",
          toActivityId: "activity-3-1",
          method: "MTR",
          duration: "30 minutes"
        },
        {
          id: "transport-3-2",
          fromActivityId: "activity-3-1",
          toActivityId: "activity-3-2",
          method: "MTR",
          duration: "45 minutes"
        },
        {
          id: "transport-3-3",
          fromActivityId: "activity-3-2",
          toActivityId: "activity-3-3",
          method: "MTR",
          duration: "20 minutes"
        },
        {
          id: "transport-3-4",
          fromActivityId: "activity-3-3",
          toActivityId: "activity-3-4",
          method: "Airport Express",
          duration: "45 minutes"
        }
      ]
    }
  ]
};