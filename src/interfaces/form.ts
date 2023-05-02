export interface FormFields {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  error: string;
  autoComplete?: boolean;
}

export interface Validation {
  [x: string]: string;
}
