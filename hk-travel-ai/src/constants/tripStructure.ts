export interface Activity {
  id: string;
  time: string;
  location: string;
  activity: string;
  duration: string;
  type?: 'activity' | 'accommodation' | 'departure';
}

export interface Transport {
  id: string;
  fromActivityId: string;
  toActivityId: string;
  method: string;
  duration: string;
  notes?: string;
}

export interface Accommodation {
  name: string;
  address: string;
  checkIn?: string;
  checkOut?: string;
}

export interface TripDay {
  date: string;
  accommodation: Accommodation;
  activities: Activity[];
  transports: Transport[];
}

export interface TripPlan {
  title: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  days: TripDay[];
  arrivalPort?: string;
  departurePort?: string;
}