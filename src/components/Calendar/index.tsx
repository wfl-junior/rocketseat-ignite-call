import { CaretLeft, CaretRight } from "phosphor-react";
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

export const Calendar: React.FC<CalendarProps> = () => (
  <CalendarContainer>
    <CalendarHeader>
      <CalendarTitle>
        Janeiro <span>2023</span>
      </CalendarTitle>

      <CalendarActions>
        <button>
          <CaretLeft />
        </button>

        <button>
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
          <td></td>
          <td></td>
          <td></td>
          <td></td>

          <td>
            <CalendarDay>1</CalendarDay>
          </td>

          <td>
            <CalendarDay disabled>2</CalendarDay>
          </td>

          <td>
            <CalendarDay>3</CalendarDay>
          </td>
        </tr>
      </tbody>
    </CalendarBody>
  </CalendarContainer>
);
