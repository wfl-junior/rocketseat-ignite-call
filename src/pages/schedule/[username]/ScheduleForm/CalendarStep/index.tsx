import { Calendar } from "~/components/Calendar";
import { Container } from "./styles";

interface CalendarStepProps {}

export const CalendarStep: React.FC<CalendarStepProps> = () => (
  <Container>
    <Calendar />
  </Container>
);
