import { Session, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters";
import { destroyCookie, parseCookies } from "nookies";
import { userIdCookieName } from "~/constants";
import { prisma } from "../prisma";

const transformUser = (user: User): AdapterUser => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email!,
  avatarUrl: user.avatarUrl!,
  emailVerified: null,
  createdAt: user.createdAt,
});

const transformSession = (session: Session): AdapterSession => ({
  userId: session.userId,
  expires: session.expiresAt,
  sessionToken: session.sessionToken,
});

export function PrismaAdapter(
  request: NextApiRequest,
  response: NextApiResponse,
): Adapter {
  return {
    async createUser(user) {
      const cookies = parseCookies({ req: request });
      const userId = cookies[userIdCookieName];

      if (!userId) {
        throw new Error("User ID not found in cookies.");
      }

      const prismaUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: user.name!,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
      });

      destroyCookie({ res: response }, userIdCookieName, {
        path: "/",
      });

      return transformUser(prismaUser);
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return null;
      }

      return transformUser(user);
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return null;
      }

      return transformUser(user);
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        select: {
          id: true,
          user: true,
        },
      });

      if (!account) {
        return null;
      }

      return transformUser(account.user);
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name!,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
      });

      return transformUser(updatedUser);
    },

    async deleteUser(userId) {
      await prisma.user.delete({ where: { id: userId } });
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refreshToken: account.refresh_token,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          tokenType: account.token_type,
          scope: account.scope,
          idToken: account.id_token,
          sessionState: account.session_state,
        },
      });
    },

    async unlinkAccount({ providerAccountId, provider }) {
      await prisma.account.delete({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      const session = await prisma.session.create({
        data: {
          userId,
          sessionToken,
          expiresAt: expires,
        },
      });

      return transformSession(session);
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });

      if (!session) {
        return null;
      }

      return {
        session: transformSession(session),
        user: transformUser(session.user),
      };
    },

    async updateSession({ sessionToken, userId, expires }) {
      const updatedSession = await prisma.session.update({
        where: { sessionToken },
        data: {
          userId,
          sessionToken,
          expiresAt: expires,
        },
      });

      return transformSession(updatedSession);
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({ where: { sessionToken } });
    },
  };
}
