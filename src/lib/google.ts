import { User } from "@prisma/client";
import dayjs from "dayjs";
import { google } from "googleapis";
import { prisma } from "./prisma";

export async function getGoogleOAuthToken(userId: User["id"]) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: "google",
      userId,
    },
    select: {
      id: true,
      accessToken: true,
      refreshToken: true,
      expiresAt: true,
    },
  });

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  auth.setCredentials({
    access_token: account.accessToken,
    refresh_token: account.refreshToken,
    expiry_date: account.expiresAt ? account.expiresAt * 1000 : null,
  });

  if (!account.expiresAt) {
    return auth;
  }

  const isTokenExpired = dayjs(account.expiresAt * 1000).isBefore(new Date());

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken();

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        accessToken: credentials.access_token,
        refreshToken: credentials.refresh_token,
        idToken: credentials.id_token,
        scope: credentials.scope,
        tokenType: credentials.token_type,
        expiresAt: credentials.expiry_date
          ? Math.floor(credentials.expiry_date / 1000)
          : null,
      },
    });

    auth.setCredentials({
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
      expiry_date: credentials.expiry_date,
    });
  }

  return auth;
}
