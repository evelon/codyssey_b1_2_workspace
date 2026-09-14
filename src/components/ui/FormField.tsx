import type React from "react";

import styles from "./FormField.module.css";
type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      <span className={styles.errorText}>{error || "\u00A0"}</span>
    </div>
  );
}
