import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import type { NextPage } from "next";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Form, FormError, Header } from "./styles";

const registerFormSchema = z.object({
  username: z
    .string({ required_error: "O nome de usuário é obrigatório." })
    .min(3, "O nome de usuário deve conter no mínimo 3 caracteres.")
    .regex(
      /^([a-z\\-]+)$/i,
      "O nome de usuário pode conter apenas letras e hifens.",
    )
    .transform(username => username.toLowerCase()),
  name: z
    .string({ required_error: "O nome é obrigatório." })
    .min(3, "O nome deve conter no mínimo 3 caracteres."),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

interface RegisterProps {}

const Register: NextPage<RegisterProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    values: {
      username: "",
      name: "",
    },
  });

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
        <div>
          <Text as="label" size="sm" htmlFor="username">
            Nome de usuário
          </Text>

          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            id="username"
            {...register("username")}
          />

          {errors.username?.message && (
            <FormError size="sm" as="span">
              {errors.username.message}
            </FormError>
          )}
        </div>

        <div>
          <Text as="label" size="sm" htmlFor="name">
            Nome completo
          </Text>

          <TextInput placeholder="Seu nome" id="name" {...register("name")} />

          {errors.name?.message && (
            <FormError size="sm" as="span">
              {errors.name.message}
            </FormError>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          Próximo Passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
