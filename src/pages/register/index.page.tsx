import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { AxiosError } from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputControl } from "~/components/InputControl";
import { messages } from "~/constants";
import { api } from "~/lib/axios";
import { RegisterFormData, registerFormSchema } from "~/validation/register";
import { Container, Form, Header } from "./styles";

interface RegisterProps {}

const Register: NextPage<RegisterProps> = () => {
  const { query, push: navigate } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      name: "",
    },
  });

  useEffect(() => {
    if (!query.username) return;
    setValue("username", String(query.username));
  }, [setValue, query.username]);

  const handleRegister = handleSubmit(async data => {
    try {
      await api.post("/users", data);
      await navigate("/register/connect-calendar");
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.status === 400 &&
        error.response?.data?.message
      ) {
        return toast(error.response.data.message, { type: "error" });
      }

      toast(messages.UNEXPECTED_ERROR, { type: "error" });
    }
  });

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleRegister}>
        <InputControl
          label="Nome de usuário"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          errorMessage={errors.username?.message}
          {...register("username")}
        />

        <InputControl
          label="Nome completo"
          placeholder="Seu nome"
          errorMessage={errors.name?.message}
          {...register("name")}
        />

        <Button type="submit" disabled={isSubmitting}>
          Próximo Passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
