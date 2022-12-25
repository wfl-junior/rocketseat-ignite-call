import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import { ZodError } from "zod";
import { userIdCookieName } from "~/constants";
import { prisma } from "~/lib/prisma";
import { internalServerErrorResponse } from "~/utils/internal-server-error-response";
import { zodErrorResponse } from "~/utils/zod-error-response";
import { registerFormSchema } from "~/validation/register";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    return response.status(405).end();
  }

  try {
    const newUserData = registerFormSchema.parse(request.body);
    const user = await prisma.user.create({
      data: newUserData,
    });

    setCookie({ res: response }, userIdCookieName, user.id, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response.status(201).json({
      ok: true,
      user,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.message.includes("Unique")
    ) {
      return response.status(400).json({
        ok: false,
        message: "Nome de usuário já cadastrado.",
      });
    }

    if (error instanceof ZodError) {
      return zodErrorResponse(response, error);
    }

    return internalServerErrorResponse(response);
  }
}

export default handler;
