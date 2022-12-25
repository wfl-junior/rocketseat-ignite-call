import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextAreaControl } from "~/components/TextAreaControl";
import { messages } from "~/constants";
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

  console.log(session);

  const handleUpdateProfile = handleSubmit(async data => {
    try {
      console.log(data);
    } catch (error) {
      toast(messages.UNEXPECTED_ERROR, { type: "error" });
    }
  });

  return (
    <Container>
      <Header>
        <Heading as="strong">Defina sua disponibilidade</Heading>

        <Text>Por último, uma breve descrição e uma foto de perfil.</Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileForm as="form" onSubmit={handleUpdateProfile}>
        <Text as="label" size="sm">
          Foto de perfil
        </Text>

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
  );
};

export default UpdateProfile;
