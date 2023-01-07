import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useRouter } from "next/router";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useMemo, useState } from "react";
import { api } from "~/lib/axios";
import { getWeekDays } from "~/utils/get-week-days";
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from "./styles";

interface BlockedDates {
  blockedWeekDays: number[];
}

interface CalendarDay {
  id: string;
  dayNumber: number;
  date: Date;
  isDisabled: boolean;
}

interface CalendarWeek {
  week: number;
  days: CalendarDay[];
}

function formatCalendarDay(
  date: dayjs.Dayjs,
  isDisabled: boolean,
): CalendarDay {
  return {
    id: date.toISOString(),
    dayNumber: date.get("date"),
    date: date.toDate(),
    isDisabled,
  };
}

const shortWeekDays = getWeekDays({ short: true });

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelected,
}) => {
  const { query } = useRouter();
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  const username = String(query.username);
  const currentYear = currentDate.get("year");
  const currentMonth = currentDate.get("month");

  const { data: blockedDates } = useQuery<BlockedDates>(
    ["users", username, "blocked-dates", currentYear, currentMonth],
    async () => {
      const { data } = await api.get<BlockedDates>(
        `/users/${username}/blocked-dates`,
        {
          params: {
            year: currentYear,
            month: currentMonth,
          },
        },
      );

      return {
        blockedWeekDays: data.blockedWeekDays,
      };
    },
  );

  const calendarWeeks = useMemo((): CalendarWeek[] => {
    const daysInMonthArray = Array.from(
      { length: currentDate.daysInMonth() },
      (_, index) => currentDate.set("date", index + 1),
    );

    const firstWeekDay = currentDate.get("day");
    const previousMonthFillArray = Array.from(
      { length: firstWeekDay },
      (_, index) => currentDate.subtract(index + 1, "day"),
    ).reverse();

    const lastDayInCurrentMonth = currentDate.set(
      "date",
      currentDate.daysInMonth(),
    );

    const lastWeekDay = lastDayInCurrentMonth.get("day");

    const nextMonthFillArray = Array.from(
      { length: 7 - (lastWeekDay + 1) },
      (_, index) => lastDayInCurrentMonth.add(index + 1, "day"),
    );

    const calendarDays = [
      ...previousMonthFillArray.map(date => formatCalendarDay(date, true)),
      ...daysInMonthArray.map(date => {
        return formatCalendarDay(
          date,
          date.endOf("day").isBefore(new Date()) ||
            Boolean(blockedDates?.blockedWeekDays.includes(date.get("day"))),
        );
      }),
      ...nextMonthFillArray.map(date => formatCalendarDay(date, true)),
    ];

    const calendarWeeks: CalendarWeek[] = [];
    let week = 0;

    while (calendarDays.length > 0) {
      calendarWeeks.push({
        week: ++week,
        days: calendarDays.splice(0, 7),
      });
    }

    return calendarWeeks;
  }, [currentDate, blockedDates]);

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, "month");
    setCurrentDate(previousMonthDate);
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, "month");
    setCurrentDate(nextMonthDate);
  }

  const formattedCurrentMonth = currentDate.format("MMMM");
  const formattedCurrentYear = currentDate.format("YYYY");

  function handleSelectDay(date: Date) {
    return () => {
      onDateSelected(date);
    };
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {formattedCurrentMonth} <span>{formattedCurrentYear}</span>
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
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(day => (
                <td key={day.id}>
                  <CalendarDay
                    disabled={day.isDisabled}
                    onClick={handleSelectDay(day.date)}
                  >
                    {day.dayNumber}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
};
