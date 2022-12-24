import { Heading, Text } from "@ignite-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import previewImage from "~/assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";
import { Container, Hero, Preview } from "./styles";

const Home: NextPage = () => (
  <Container>
    <Hero>
      <Heading as="h1" size="4xl">
        Agendamento descomplicado
      </Heading>

      <Text size="xl">
        Conecte seu calendário e permita que as pessoas marquem agendamentos no
        seu tempo livre.
      </Text>

      <ClaimUsernameForm />
    </Hero>

    <Preview>
      <Image
        src={previewImage}
        alt="Calendário simbolizando a aplicação em andamento"
        quality={100}
        priority
      />
    </Preview>
  </Container>
);

export default Home;
