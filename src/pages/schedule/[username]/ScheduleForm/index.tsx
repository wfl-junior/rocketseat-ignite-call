import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";

interface ScheduleFormProps {}

export const ScheduleForm: React.FC<ScheduleFormProps> = () => {
  const isConfirmStep = true;

  if (isConfirmStep) {
    return <ConfirmStep />;
  }

  return <CalendarStep />;
};
