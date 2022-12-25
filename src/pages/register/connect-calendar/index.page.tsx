import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";

interface ConnectCalendarProps {}

const ConnectCalendar: NextPage<ConnectCalendarProps> = () => {
  const { status } = useSession();
  const { query, push: navigate } = useRouter();

  const hasAuthError = Boolean(query.error);
  const isAuthenticated = status === "authenticated";

  function handleSignInWithGoogle() {
    return signIn("google");
  }

  function handleNavigateToNextStep() {
    return navigate("/register/time-intervals");
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>

        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>

          {isAuthenticated ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSignInWithGoogle}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button
          type="submit"
          disabled={!isAuthenticated || hasAuthError}
          onClick={handleNavigateToNextStep}
        >
          Próximo Passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
};

export default ConnectCalendar;
