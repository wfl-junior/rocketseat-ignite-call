import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import type { NextPage } from "next";
import { ArrowRight } from "phosphor-react";
import { Container, Form, Header } from "./styles";

interface RegisterProps {}

const Register: NextPage<RegisterProps> = () => (
  <Container>
    <Header>
      <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

      <Text>
        Precisamos de algumas informações para criar seu perfil! Ah, você pode
        editar essas informações depois.
      </Text>

      <MultiStep size={4} currentStep={1} />
    </Header>

    <Form as="form">
      <div>
        <Text as="label" size="sm" htmlFor="username">
          Nome de usuário
        </Text>

        <TextInput
          prefix="ignite.com/"
          placeholder="seu-usuario"
          id="username"
        />
      </div>

      <div>
        <Text as="label" size="sm" htmlFor="name">
          Nome completo
        </Text>

        <TextInput placeholder="Seu nome" id="name" />
      </div>

      <Button type="submit">
        Próximo Passo
        <ArrowRight />
      </Button>
    </Form>
  </Container>
);

export default Register;
