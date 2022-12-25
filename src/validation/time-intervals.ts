import { z } from "zod";

export const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        isEnabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform(intervals => intervals.filter(interval => interval.isEnabled))
    .refine(
      intervals => intervals.length > 0,
      "Você precisa selecionar pelo menos um dia da semana!",
    ),
});

export type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>;
