import dayjs from "dayjs";
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { getGoogleOAuthToken } from "~/lib/google";
import { prisma } from "~/lib/prisma";
import { internalServerErrorResponse } from "~/utils/internal-server-error-response";
import { zodErrorResponse } from "~/utils/zod-error-response";
import { confirmScheduleApiSchema } from "~/validation/confirm-schedule";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  try {
    const username = request.query.username?.toString();
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
      },
    });

    if (!user) {
      return response.status(404).end();
    }

    const { date, ...createSchedulingData } = confirmScheduleApiSchema.parse(
      request.body,
    );

    const schedulingDate = dayjs(date).startOf("hour");

    if (schedulingDate.isBefore(new Date())) {
      return response.status(400).json({
        ok: false,
        message: "Date is in the past.",
      });
    }

    const conflictingScheduling = await prisma.scheduling.findFirst({
      where: {
        userId: user.id,
        date: schedulingDate.toDate(),
      },
    });

    if (conflictingScheduling) {
      return response.status(400).json({
        ok: false,
        message: "This scheduling time is already filled.",
      });
    }

    const scheduling = await prisma.scheduling.create({
      data: {
        ...createSchedulingData,
        date: schedulingDate.toDate(),
        userId: user.id,
      },
    });

    const calendar = google.calendar({
      version: "v3",
      auth: await getGoogleOAuthToken(user.id),
    });

    await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Ignite Call: ${scheduling.name}`,
        description: scheduling.observations,
        start: {
          dateTime: schedulingDate.format(),
        },
        end: {
          dateTime: schedulingDate.add(1, "hour").format(),
        },
        attendees: [
          {
            email: scheduling.email,
            displayName: scheduling.name,
          },
        ],
        conferenceData: {
          createRequest: {
            requestId: scheduling.id,
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
      },
    });

    return response.status(201).json({
      ok: true,
      scheduling,
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
