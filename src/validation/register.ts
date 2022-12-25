import { z } from "zod";
import { claimUsernameFormSchema } from "./claim-username";

export const registerFormSchema = claimUsernameFormSchema.extend({
  name: z
    .string({
      required_error: "O nome é obrigatório.",
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(3, "O nome deve conter no mínimo 3 caracteres."),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
