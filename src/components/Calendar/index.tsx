import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import { getWeekDays } from "~/utils/get-week-days";
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from "./styles";

const shortWeekDays = getWeekDays({ short: true });

interface CalendarProps {}

export const Calendar: React.FC<CalendarProps> = () => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, "month");
    setCurrentDate(previousMonthDate);
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, "month");
    setCurrentDate(nextMonthDate);
  }

  const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Mês anterior">
            <CaretLeft />
          </button>

          <button onClick={handleNextMonth} title="Próximo mês">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map(weekday => (
              <th key={weekday}>{weekday}.</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td />
            <td />
            <td />
            <td />

            <td>
              <CalendarDay>1</CalendarDay>
            </td>

            <td>
              <CalendarDay>2</CalendarDay>
            </td>

            <td>
              <CalendarDay disabled>3</CalendarDay>
            </td>
          </tr>

          <tr>
            <td>
              <CalendarDay disabled>4</CalendarDay>
            </td>

            <td>
              <CalendarDay>5</CalendarDay>
            </td>

            <td>
              <CalendarDay>6</CalendarDay>
            </td>

            <td>
              <CalendarDay>7</CalendarDay>
            </td>

            <td>
              <CalendarDay>8</CalendarDay>
            </td>

            <td>
              <CalendarDay>9</CalendarDay>
            </td>

            <td>
              <CalendarDay disabled>10</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
};
