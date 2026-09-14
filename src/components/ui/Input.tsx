import { FormField } from "./FormField";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
};

export function Input({ label, error, ...inputProps }: InputProps) {
  return (
    <FormField label={label} error={error}>
      <input
        {...inputProps}
        onChange={(e) => {
          inputProps.onChange(e.target.value);
        }}
      />
    </FormField>
  );
}
