import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "~/lib/auth/prisma-adapter";

export function buildNextAuthOptions(
  request: NextApiRequest,
  response: NextApiResponse,
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(request, response),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            scope:
              "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: "",
            email: profile.email,
            avatarUrl: profile.picture,
            createdAt: new Date(),
          };
        },
      }),
    ],
    callbacks: {
      async signIn({ account }) {
        if (
          !account?.scope?.includes("https://www.googleapis.com/auth/calendar")
        ) {
          return "/register/connect-calendar?error=permissions";
        }

        return true;
      },

      async session({ session, user }) {
        return {
          ...session,
          user,
        };
      },
    },
  };
}

function handler(request: NextApiRequest, response: NextApiResponse) {
  return NextAuth(request, response, buildNextAuthOptions(request, response));
}

export default handler;
