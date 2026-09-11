import type React from "react";

import styles from "./Button.module.css";
import { Spinner } from "./Spinner";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  disabled,
  isLoading,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={styles.button}
      data-variant={variant}
    >
      {isLoading && <Spinner size="xs" />}
      {children}
    </button>
  );
}
