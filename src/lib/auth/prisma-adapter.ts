import { Adapter } from "next-auth/adapters";
import { prisma } from "../prisma";

export const PrismaAdapter = (): Adapter => ({
  async createUser(user) {},

  async getUser(id) {
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email!,
      avatarUrl: user.avatarUrl!,
      emailVerified: null,
      createdAt: user.createdAt,
    };
  },
  async getUserByEmail(email) {},
  async getUserByAccount({ providerAccountId, provider }) {},
  async updateUser(user) {},
  async deleteUser(userId) {},
  async linkAccount(account) {},
  async unlinkAccount({ providerAccountId, provider }) {},
  async createSession({ sessionToken, userId, expires }) {},
  async getSessionAndUser(sessionToken) {},
  async updateSession({ sessionToken }) {},
  async deleteSession(sessionToken) {},
  async createVerificationToken({ id, expiresAt, token }) {},
  async useVerificationToken({ id, token }) {},
});
