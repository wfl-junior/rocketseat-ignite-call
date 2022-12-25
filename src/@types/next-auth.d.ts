import { User as PrismaUser } from "@prisma/client";
import { Session as DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends PrismaUser {}

  interface Session extends DefaultSession {
    user: User;
  }
}
