import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { ZodError } from "zod";
import { messages } from "~/constants";
import { prisma } from "~/lib/prisma";
import { internalServerErrorResponse } from "~/utils/internal-server-error-response";
import { zodErrorResponse } from "~/utils/zod-error-response";
import { timeIntervalsApiSchema } from "~/validation/time-intervals";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  try {
    const session = await unstable_getServerSession(
      request,
      response,
      buildNextAuthOptions(request, response),
    );

    if (!session) {
      return response.status(401).json({
        ok: false,
        message: messages.UNAUTHENTICATED,
      });
    }

    const { intervals } = timeIntervalsApiSchema.parse(request.body);

    await prisma.timeInterval.createMany({
      data: intervals.map(interval => ({
        ...interval,
        userId: session.user.id,
      })),
    });

    return response.status(201).json({
      ok: true,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(response, error);
    }

    console.log(error);
    return internalServerErrorResponse(response);
  }
}

export default handler;
