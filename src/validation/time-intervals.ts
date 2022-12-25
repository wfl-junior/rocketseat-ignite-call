import { z } from "zod";
import { convertTimeStringToMinutes } from "~/utils/convert-time-string-to-minutes";

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
      "Você precisa selecionar pelo menos um dia da semana.",
    )
    .transform(intervals => {
      return intervals.map(interval => ({
        weekDay: interval.weekDay,
        startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
      }));
    })
    .refine(intervals => {
      return intervals.every(interval => {
        return interval.endTimeInMinutes - interval.startTimeInMinutes >= 60;
      });
    }, "O horário de término deve ser pelo menos 1 hora após o horário de início."),
});

export type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
export type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;
