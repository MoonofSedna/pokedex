// interfaces
import { AlertProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Alert({
  alerts,
}: AlertProps) {
  return (
    <C.AlertContainer>
      {alerts.map((alert) => (
        <C.Alert key={alert.id}>
          <span>{alert.message}</span>
        </C.Alert>
      ))}
    </C.AlertContainer>
  );
}
