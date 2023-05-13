// components
import Button from "../Button";
// interfaces
import { FormProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Form({
  fields,
  error,
  handleChange,
  handleSubmit,
  buttonText,
  submitting,
}: FormProps) {
  return (
    <C.Form
      onSubmit={handleSubmit}
      noValidate
    >
      <h3>{buttonText}</h3>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            placeholder={
              field.placeholder
            }
            name={field.name}
            value={field.value}
            onChange={handleChange}
            autoComplete={
              field.autoComplete
                ? "on"
                : "off"
            }
          />
          {field.error && (
            <span>{field.error}</span>
          )}
        </div>
      ))}

      <Button
        type="submit"
        width="100%"
        disabled={submitting}
      >
        {buttonText}
      </Button>
      {error && <span>{error}</span>}
    </C.Form>
  );
}
