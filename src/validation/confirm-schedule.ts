import { z } from "zod";

export const confirmScheduleFormSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório.",
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(3, "O nome deve conter no mínimo 3 caracteres."),
  email: z
    .string({
      required_error: "O e-mail é obrigatório.",
      invalid_type_error: "O e-mail deve ser uma string.",
    })
    .email("Digite um e-mail válido."),
  observations: z
    .string({ invalid_type_error: "O e-mail deve ser uma string." })
    .nullable(),
});

export type ConfirmScheduleFormData = z.infer<typeof confirmScheduleFormSchema>;

export const confirmScheduleApiSchema = confirmScheduleFormSchema.extend({
  date: z
    .string({
      required_error: "A data é obrigatória.",
      invalid_type_error: "A data deve ser uma string.",
    })
    .datetime("A data deve ser uma string de data válida."),
});
