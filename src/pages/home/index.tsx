import { Heading, Text } from "@ignite-ui/react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { Fragment } from "react";
import previewImage from "~/assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClaimUsernameForm";
import { Container, Hero, Preview } from "./styles";

const Home: NextPage = () => (
  <Fragment>
    <NextSeo
      title="Descomplique sua agenda | Ignite Call"
      description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
    />

    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>

        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
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
  </Fragment>
);

export default Home;
