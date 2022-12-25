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

export const timeIntervalsApiSchema = z.object({
  intervals: z
    .array(
      z
        .object({
          weekDay: z
            .number({
              required_error: "O dia da semana é obrigatório.",
              invalid_type_error:
                "O dia da semana deve ser um número de 0 a 6.",
            })
            .min(0, "O dia da semana deve ser de 0 a 6.")
            .max(6, "O dia da semana deve ser de 0 a 6."),
          startTimeInMinutes: z
            .number({
              required_error: "O horário de início é obrigatório",
              invalid_type_error: "O horário de início deve ser um número.",
            })
            .min(0, "O horário de início deve ser de 0 a 1440")
            .max(1440, "O horário de início deve ser de 0 a 1440"),
          endTimeInMinutes: z
            .number({
              required_error: "O horário de término é obrigatório",
              invalid_type_error: "O horário de término deve ser um número.",
            })
            .min(0, "O horário de término deve ser de 0 a 1440")
            .max(1440, "O horário de término deve ser de 0 a 1440"),
        })
        .refine(interval => {
          return interval.endTimeInMinutes - interval.startTimeInMinutes >= 60;
        }),
    )
    .min(1, "É necessário informar pelo menos um intervalo de horário."),
});
