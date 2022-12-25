import type { NextApiResponse } from "next";
import { ZodError } from "zod";

export function zodErrorResponse(response: NextApiResponse, error: ZodError) {
  return response.status(422).json({
    ok: false,
    errors: error.formErrors.fieldErrors,
    message:
      Object.values(error.formErrors.fieldErrors)[0]?.[0] ??
      "Erro de validação de dados.",
  });
}
