import styles from "./Input.module.css";

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
};

export function Input({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        data-error={!!error}
      />
      <span className={styles.errorText}>{error || "\u00A0"}</span>
    </div>
  );
}
