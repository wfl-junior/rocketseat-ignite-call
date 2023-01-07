import { Avatar, Heading, Text } from "@ignite-ui/react";
import type { User } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { prisma } from "~/lib/prisma";
import { Container, UserHeader } from "./styles";

interface ScheduleProps {
  user: Pick<User, "name" | "bio" | "avatarUrl">;
}

type ScheduleParams = {
  username: User["username"];
};

export const getStaticPaths: GetStaticPaths<ScheduleParams> = async () => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
    },
  });

  return {
    fallback: "blocking",
    paths: users.map(user => ({ params: { username: user.username } })),
  };
};

export const getStaticProps: GetStaticProps<
  ScheduleProps,
  ScheduleParams
> = async ({ params }) => {
  const username = String(params!.username);
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      name: true,
      bio: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    revalidate: 60 * 60 * 24, // 24 hours
    props: { user },
  };
};

const Schedule: NextPage<ScheduleProps> = ({ user }) => (
  <Container>
    <UserHeader>
      <Avatar
        src={user.avatarUrl ?? undefined}
        alt={user.name}
        referrerPolicy="no-referrer"
      />

      <Heading>{user.name}</Heading>
      <Text>{user.bio}</Text>
    </UserHeader>
  </Container>
);

export default Schedule;
