import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import type { NextPage } from "next";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { getWeekDays } from "~/utils/get-week-days";
import { timeIntervalsFormSchema } from "~/validation/time-intervals";
import { Container, Header } from "../styles";
import {
  IntervalDay,
  IntervalForm,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from "./styles";

const weekDays = getWeekDays();

interface TimeIntervalsProps {}

const TimeIntervals: NextPage<TimeIntervalsProps> = () => {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, isEnabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, isEnabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, isEnabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, isEnabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, isEnabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, isEnabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, isEnabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const intervals = watch("intervals");
  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const handleSetTimeIntervals = handleSubmit(data => {
    console.log(data);
  });

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalForm as="form" onSubmit={handleSetTimeIntervals}>
        <IntervalsContainer>
          {fields.map((field, index) => {
            const weekDay = weekDays[field.weekDay];

            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    control={control}
                    name={`intervals.${index}.isEnabled`}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        id={weekDay}
                        checked={value}
                        onCheckedChange={checked => onChange(checked === true)}
                      />
                    )}
                  />

                  <Text as="label" htmlFor={weekDay}>
                    {weekDay}
                  </Text>
                </IntervalDay>

                <IntervalInputs>
                  <TextInput
                    type="time"
                    size="sm"
                    step={60}
                    disabled={!intervals[index].isEnabled}
                    {...register(`intervals.${index}.startTime`)}
                  />

                  <TextInput
                    type="time"
                    size="sm"
                    step={60}
                    disabled={!intervals[index].isEnabled}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            );
          })}
        </IntervalsContainer>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalForm>
    </Container>
  );
};

export default TimeIntervals;
