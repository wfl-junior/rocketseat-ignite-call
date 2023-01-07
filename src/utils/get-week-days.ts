import { ucfirst } from "./ucfirst";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
});

interface GetWeekDaysParams {
  short?: boolean;
}

export function getWeekDays({ short }: GetWeekDaysParams = {}): string[] {
  return Array.from(Array(7).keys()).map(weekDay => {
    const weekDayString = formatter.format(
      new Date(Date.UTC(2021, 5, weekDay)),
    );

    if (short) {
      return weekDayString.substring(0, 3).toUpperCase();
    }

    return ucfirst(weekDayString);
  });
}
