import { Session, User } from "@prisma/client";
import { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters";
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

export const PrismaAdapter = (): Adapter => ({
  async createUser(user) {},

  async getUser(id) {
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    return transformUser(user);
  },

  async getUserByEmail(email) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    return transformUser(user);
  },

  async getUserByAccount({ providerAccountId, provider }) {
    const { user } = await prisma.account.findUniqueOrThrow({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      include: {
        user: true,
      },
    });

    return transformUser(user);
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
    const { user, ...session } = await prisma.session.findUniqueOrThrow({
      where: { sessionToken },
      include: { user: true },
    });

    return {
      session: transformSession(session),
      user: transformUser(user),
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
});
