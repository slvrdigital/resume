export type SportType = "Crossfit" | "Workout";

export interface Activity {
  name: string;
  description: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  type: string;
  sport_type: SportType;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  location_city: any;
  location_state: any;
  location_country: any;
  private: boolean;
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
}
