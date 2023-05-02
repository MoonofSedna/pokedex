import {
  useState,
  ChangeEvent,
} from "react";
// interfaces
import { Validation } from "@/interfaces/form";

export default function useValidation(
  initialState: Validation,
  validate: (
    x: Validation
  ) => Validation,
  func: () => void
) {
  const [values, setValues] = useState(
    initialState as Validation
  );
  const [errors, setErrors] = useState(
    {} as Validation
  );

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const validationErrors =
      validate(values);
    setErrors(validationErrors);
    if (
      Object.keys(validationErrors)
        .length === 0
    ) {
      func();
    }
  };

  const handleBlur = () => {
    const validationErrors =
      validate(values);
    setErrors(validationErrors);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm: () =>
      setValues(initialState),
  };
}
