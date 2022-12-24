import { z } from "zod";

export const claimUsernameFormSchema = z.object({
  username: z
    .string({ required_error: "O nome de usuário é obrigatório." })
    .min(3, "O nome de usuário deve conter no mínimo 3 caracteres.")
    .regex(
      /^([a-z\\-]+)$/i,
      "O nome de usuário pode conter apenas letras e hifens.",
    )
    .transform(username => username.toLowerCase()),
});

export type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;
