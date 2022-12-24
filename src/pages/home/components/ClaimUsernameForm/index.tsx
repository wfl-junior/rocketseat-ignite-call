import { Button, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Form } from "./styles";

interface ClaimUsernameFormProps {}

export const ClaimUsernameForm: React.FC<ClaimUsernameFormProps> = () => (
  <Form as="form" onSubmit={event => event.preventDefault()}>
    <TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuario" />

    <Button size="sm" type="submit">
      Reservar
      <ArrowRight />
    </Button>
  </Form>
);
