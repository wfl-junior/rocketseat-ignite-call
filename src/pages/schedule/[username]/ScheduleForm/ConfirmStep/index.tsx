import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@ignite-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputControl } from "~/components/InputControl";
import { TextAreaControl } from "~/components/TextAreaControl";
import { messages } from "~/constants";
import { api } from "~/lib/axios";
import {
  ConfirmScheduleFormData,
  confirmScheduleFormSchema,
} from "~/validation/confirm-schedule";
import { ConfirmForm, FormActions, FormHeader } from "./styles";

interface ConfirmStepProps {
  schedulingDate: Date;
  onClear?: () => void;
}

export const ConfirmStep: React.FC<ConfirmStepProps> = ({
  schedulingDate,
  onClear,
}) => {
  const { query } = useRouter();
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

  const handleConfirmScheduling = handleSubmit(async data => {
    try {
      const username = String(query.username);

      await api.post(`/users/${username}/schedule`, {
        ...data,
        date: schedulingDate.toISOString(),
      });

      onClear?.();
    } catch {
      toast(messages.UNEXPECTED_ERROR, { type: "error" });
    }
  });

  const describedDate = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ]YYYY");
  const describedTime = dayjs(schedulingDate).format("HH:mm[h]");

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>

        <Text>
          <Clock />
          {describedTime}
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
        <Button type="button" variant="tertiary" onClick={onClear}>
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
};
