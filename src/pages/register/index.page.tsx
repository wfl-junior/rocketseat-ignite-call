import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputControl } from "~/components/InputControl";
import { RegisterFormData, registerFormSchema } from "~/validation/register";
import { Container, Form, Header } from "./styles";

interface RegisterProps {}

const Register: NextPage<RegisterProps> = () => {
  const { query } = useRouter();
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

  const handleRegister = handleSubmit(values => {
    console.log(values);
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
