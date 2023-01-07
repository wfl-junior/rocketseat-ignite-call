import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";
import { internalServerErrorResponse } from "~/utils/internal-server-error-response";

type BlockedDatesRawQueryResult = Array<{
  date: number;
  amount: number;
  size: number;
}>;

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "GET") {
    return response.status(405).end();
  }

  try {
    const username = request.query.username?.toString();
    const year = request.query.year?.toString();
    const month = request.query.month?.toString().padStart(2, "0");

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

    const blockedWeekDays = Array.from(
      { length: 7 },
      (_, index) => index,
    ).filter(weekDay => {
      return !availableWeekDays.some(
        availableWeekDay => availableWeekDay.weekDay === weekDay,
      );
    });

    const blockedDatesRaw = await prisma.$queryRaw<BlockedDatesRawQueryResult>`
      SELECT 
        EXTRACT(DAY FROM S.date) AS date,
        COUNT(S.date) AS amount,
        ((TI.endTimeInMinutes - TI.startTimeInMinutes) / 60) AS size
      FROM schedulings S
      LEFT JOIN time_intervals TI
        ON TI.weekDay = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))
      WHERE S.userId = ${user.id}
        AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
      GROUP BY date, size
      HAVING amount >= size;
    `;

    const blockedDates = blockedDatesRaw.map(item => item.date);

    return response.status(200).json({
      ok: true,
      blockedWeekDays,
      blockedDates,
    });
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(response);
  }
}

export default handler;
