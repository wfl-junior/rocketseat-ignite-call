import { ucfirst } from "./ucfirst";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
});

export function getWeekDays(): string[] {
  return Array.from(Array(7).keys()).map(weekDay => {
    return ucfirst(formatter.format(new Date(Date.UTC(2021, 5, weekDay))));
  });
}
