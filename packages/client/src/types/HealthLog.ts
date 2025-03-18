export interface HealthLog {
  id: number;
  mood: number;
  anxiety: number;
  sleepHours: number;
  sleepQuality: number;
  sleepDisturbance: string | null;
  physicalActivityType: string | null;
  physicalActivityDuration: number | null;
  socialInteractions: string | null;
  stress: number;
  symptomDetails: string | null;
  createdAt: string;
  userId: number;
}
