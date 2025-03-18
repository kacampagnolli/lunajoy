import { z } from "zod";

export const createHealthLogSchema = z.object({
  mood: z.number().min(1).max(10),
  anxiety: z.number().min(1).max(10),
  sleepHours: z.number().min(0).max(24),
  sleepQuality: z.number().min(1).max(10),
  sleepDisturbance: z.string().nullable(),
  physicalActivityType: z.string().nullable(),
  physicalActivityDuration: z.number().nullable(),
  socialInteractions: z.string().nullable(),
  stress: z.number().min(1).max(10),
  symptomDetails: z.string().nullable(),
});

export type CreateHealthLog = z.infer<typeof createHealthLogSchema>;
