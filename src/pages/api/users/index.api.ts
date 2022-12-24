import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";
import { registerFormSchema } from "~/validation/register";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  try {
    const newUserData = registerFormSchema.parse(request.body);

    const user = await prisma.user.create({
      data: newUserData,
    });

    return response.status(201).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      ok: false,
      message: "Houston, we have a problem.",
    });
  }
}
