import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Calendar } from "~/components/Calendar";
import { messages } from "~/constants";
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

interface CalendarStepProps {}

export const CalendarStep: React.FC<CalendarStepProps> = () => {
  const { query } = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailabilily] = useState<Availability | null>(null);

  const username = query.username?.toString();

  useEffect(() => {
    if (!selectedDate || !username) return;

    api
      .get<Availability>(`/users/${username}/availability`, {
        params: {
          date: selectedDate.toISOString().split("T")[0],
        },
      })
      .then(({ data }) => {
        setAvailabilily({
          possibleTimes: data.possibleTimes,
          availableTimes: data.availableTimes,
        });
      })
      .catch(() => toast(messages.UNEXPECTED_ERROR, { type: "error" }));
  }, [selectedDate, username]);

  const isDateSelected = Boolean(selectedDate);
  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describedDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map(hour => (
              <TimePickerItem
                key={hour}
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
