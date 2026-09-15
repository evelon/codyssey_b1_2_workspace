import { useId } from "react";

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
  const id = useId();
  return (
    <FormField label={label} error={error} htmlFor={id}>
      <input
        id={id}
        className={styles.input}
        data-error={!!error}
        {...inputProps}
        onChange={(e) => {
          inputProps.onChange(e.target.value);
        }}
      />
    </FormField>
  );
}
