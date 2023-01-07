import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { InputControl } from "~/components/InputControl";
import { TextAreaControl } from "~/components/TextAreaControl";
import {
  ConfirmScheduleFormData,
  confirmScheduleFormSchema,
} from "~/validation/confirm-schedule";
import { ConfirmForm, FormActions, FormHeader } from "./styles";

interface ConfirmStepProps {}

export const ConfirmStep: React.FC<ConfirmStepProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmScheduleFormData>({
    resolver: zodResolver(confirmScheduleFormSchema),
    defaultValues: {
      name: "",
      email: "",
      observations: "",
    },
  });

  const handleConfirmScheduling = handleSubmit(data => {
    console.log(data);
  });

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

      <InputControl
        label="Nome completo"
        placeholder="Seu nome"
        errorMessage={errors.name?.message}
        {...register("name")}
      />

      <InputControl
        label="Endereço de e-mail"
        placeholder="johndoe@example.com"
        type="email"
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <TextAreaControl
        label="Observações"
        errorMessage={errors.observations?.message}
        {...register("observations")}
      />

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
};
