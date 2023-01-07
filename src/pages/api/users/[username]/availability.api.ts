import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";
import { internalServerErrorResponse } from "~/utils/internal-server-error-response";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "GET") {
    return response.status(405).end();
  }

  try {
    const username = request.query.username?.toString();
    const date = request.query.date?.toString();

    if (!date) {
      return response.status(400).json({
        ok: false,
        message: "Date not provided.",
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

    const referenceDate = dayjs(date);
    const isPastDate = referenceDate.endOf("day").isBefore(new Date());

    if (isPastDate) {
      return response.status(200).json({
        ok: true,
        possibleTimes: [],
        availableTimes: [],
      });
    }

    const userAvailability = await prisma.timeInterval.findFirst({
      where: {
        userId: user.id,
        weekDay: referenceDate.get("day"),
      },
    });

    if (!userAvailability) {
      return response.status(200).json({
        ok: true,
        possibleTimes: [],
        availableTimes: [],
      });
    }

    const { startTimeInMinutes, endTimeInMinutes } = userAvailability;

    const startHour = Math.floor(startTimeInMinutes / 60);
    const endHour = Math.floor(endTimeInMinutes / 60);

    const possibleTimes = Array.from(
      { length: endHour - startHour },
      (_, index) => startHour + index,
    );

    const blockedTimes = await prisma.scheduling.findMany({
      where: {
        userId: user.id,
        date: {
          gte: referenceDate.set("hour", startHour).toDate(),
          lte: referenceDate.set("hour", endHour).toDate(),
        },
      },
      select: {
        date: true,
      },
    });

    const availableTimes = possibleTimes.filter(time => {
      return !blockedTimes.some(
        blockedTime => blockedTime.date.getHours() === time,
      );
    });

    return response.status(200).json({
      ok: true,
      possibleTimes,
      availableTimes,
    });
  } catch (error) {
    return internalServerErrorResponse(response);
  }
}

export default handler;
