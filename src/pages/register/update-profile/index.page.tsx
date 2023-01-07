import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextAreaControl } from "~/components/TextAreaControl";
import { messages } from "~/constants";
import { api } from "~/lib/axios";
import { buildNextAuthOptions } from "~/pages/api/auth/[...nextauth].api";
import {
  UpdateProfileFormData,
  updateProfileFormSchema,
} from "~/validation/update-profile";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileForm } from "./styles";

interface UpdateProfileProps {}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  );

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  return {
    props: {
      session: {
        ...session,
        user: {
          ...session.user,
          createdAt: session.user.createdAt.toISOString(),
        },
      },
    },
  };
};

const UpdateProfile: NextPage<UpdateProfileProps> = () => {
  const { push: navigate } = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      bio: "",
    },
  });

  const handleUpdateProfile = handleSubmit(async data => {
    try {
      await api.patch("/users/profile", data);
      await navigate(`/schedule/${session?.user.username}`);
    } catch {
      toast(messages.UNEXPECTED_ERROR, { type: "error" });
    }
  });

  return (
    <Fragment>
      <NextSeo noindex title="Atualize seu perfil | Ignite Call" />

      <Container>
        <Header>
          <Heading as="strong">Atualize seu perfil</Heading>
          <Text>Por último, uma breve descrição e uma foto de perfil.</Text>
          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileForm as="form" onSubmit={handleUpdateProfile}>
          <div>
            <Text size="sm">Foto de perfil</Text>

            <Avatar
              src={session?.user.avatarUrl ?? undefined}
              alt={session?.user.name ?? ""}
              referrerPolicy="no-referrer"
            />
          </div>

          <TextAreaControl
            label="Sobre você"
            errorMessage={errors.bio?.message}
            {...register("bio")}
          />

          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileForm>
      </Container>
    </Fragment>
  );
};

export default UpdateProfile;
