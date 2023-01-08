import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { Calendar } from "~/components/Calendar";
import { api } from "~/lib/axios";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export const CalendarStep: React.FC<CalendarStepProps> = ({
  onSelectDateTime,
}) => {
  const { query } = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const username = String(query.username);
  const isDateSelected = Boolean(selectedDate);
  const selectedDateISO = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  const { data: availability } = useQuery<Availability>(
    ["users", username, "availability", selectedDateISO],
    async () => {
      const { data } = await api.get<Availability>(
        `/users/${username}/availability`,
        {
          params: {
            date: selectedDate!.toISOString(),
          },
        },
      );

      return {
        possibleTimes: data.possibleTimes,
        availableTimes: data.availableTimes,
      };
    },
    {
      enabled: isDateSelected,
    },
  );

  function handleSelectTime(hour: number) {
    if (!selectedDate) return;

    return () => {
      const dateWithTime = dayjs(selectedDate)
        .set("hour", hour)
        .startOf("hour");

      onSelectDateTime(dateWithTime.toDate());
    };
  }

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describedDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map(hour => (
              <TimePickerItem
                key={hour}
                onClick={handleSelectTime(hour)}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {hour.toString().padStart(2, "0")}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
};
