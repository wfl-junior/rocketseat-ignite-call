import { z } from "zod";

export const updateProfileFormSchema = z.object({
  bio: z
    .string({
      required_error: "A biografia é obrigatória.",
      invalid_type_error: "A biografia deve ser uma string.",
    })
    .min(3, "A biografia deve conter no mínimo 3 caracteres."),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;
