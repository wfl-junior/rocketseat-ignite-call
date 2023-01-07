import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";
import { internalServerErrorResponse } from "~/utils/internal-server-error-response";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "GET") {
    return response.status(405).end();
  }

  try {
    const username = request.query.username?.toString();
    const year = request.query.year?.toString();
    const month = request.query.month?.toString();

    if (!year) {
      return response.status(400).json({
        ok: false,
        message: "Year not provided.",
      });
    }

    if (!month) {
      return response.status(400).json({
        ok: false,
        message: "Month not provided.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
      },
    });

    if (!user) {
      return response.status(404).end();
    }

    const availableWeekDays = await prisma.timeInterval.findMany({
      where: {
        userId: user.id,
      },
      select: {
        weekDay: true,
      },
    });

    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(weekDay => {
      return !availableWeekDays.some(
        availableWeekDay => availableWeekDay.weekDay === weekDay,
      );
    });

    return response.status(200).json({
      ok: true,
      blockedWeekDays,
    });
  } catch (error) {
    return internalServerErrorResponse(response);
  }
}

export default handler;
