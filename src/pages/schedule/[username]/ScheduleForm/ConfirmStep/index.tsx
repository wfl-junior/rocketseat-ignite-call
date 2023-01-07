import { Button, Text } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import type { FormEvent } from "react";
import { InputControl } from "~/components/InputControl";
import { TextAreaControl } from "~/components/TextAreaControl";
import { ConfirmForm, FormActions, FormHeader } from "./styles";

interface ConfirmStepProps {}

export const ConfirmStep: React.FC<ConfirmStepProps> = () => {
  function handleConfirmScheduling(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <InputControl label="Nome completo" placeholder="Seu nome" name="name" />

      <InputControl
        label="Endereço de e-mail"
        placeholder="johndoe@example.com"
        name="email"
        type="email"
      />

      <TextAreaControl label="Observações" name="observations" />

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  );
};
