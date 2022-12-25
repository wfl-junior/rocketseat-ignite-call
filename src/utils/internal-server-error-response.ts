import type { NextApiResponse } from "next";
import { messages } from "~/constants";

export function internalServerErrorResponse(response: NextApiResponse) {
  return response.status(500).json({
    ok: false,
    message: messages.INTERVAL_SERVER_ERROR,
  });
}
