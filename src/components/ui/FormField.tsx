import type React from "react";

import styles from "./FormField.module.css";
type FormFieldProps = {
  label: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
};

export function FormField({ label, error, htmlFor, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      <span className={styles.errorText}>{error || "\u00A0"}</span>
    </div>
  );
}
