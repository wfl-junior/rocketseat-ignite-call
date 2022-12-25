import { z } from "zod";

export const timeIntervalsFormSchema = z.object({});

export type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>;
