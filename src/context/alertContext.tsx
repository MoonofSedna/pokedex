import {
  useState,
  createContext,
  useCallback,
} from "react";
// interfaces
import {
  AlertContextProps,
  Alerts,
  ProviderProps,
} from "@/interfaces/components";

const initialState = {
  alerts: [],
  alert: () => {},
  removeAlert: () => {},
};

export const AlertContext =
  createContext<AlertContextProps>(
    initialState
  );

const AlertContextProvider = ({
  children,
}: ProviderProps) => {
  const [alerts, setAlerts] = useState<
    Alerts[]
  >([]);

  const addAlert = useCallback(
    (message: string) => {
      const newAlert = {
        message,
        id: Date.now(),
      };

      setAlerts((prev) => [
        ...prev,
        newAlert,
      ]);

      setTimeout(() => {
        removeAlert(newAlert.id);
      }, 3000);
    },
    []
  );

  const removeAlert = (id: number) => {
    setAlerts((prev) =>
      prev.filter(
        (alert) => alert.id !== id
      )
    );
  };

  const alertContextValues = {
    alerts,
    alert: addAlert,
    removeAlert,
  };

  return (
    <AlertContext.Provider
      value={alertContextValues}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
