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