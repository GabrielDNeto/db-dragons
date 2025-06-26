import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

import styles from "./Input.module.scss";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "text" | "password";
  hasError?: boolean;
};

const Input = ({
  variant = "text",
  className = "",
  hasError = false,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const type =
    variant === "password" ? (showPassword ? "text" : "password") : variant;

  if (variant === "password") {
    return (
      <div
        className={clsx(styles.inputWrapper, className, {
          [styles.error]: hasError,
        })}
      >
        <input
          type={type}
          className={clsx(styles.input, {
            [styles.error]: hasError,
          })}
          {...rest}
        />

        {variant === "password" && (
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    );
  }

  return (
    <input
      className={clsx(
        styles.input,
        {
          [styles.error]: hasError,
        },
        className,
      )}
      {...rest}
    />
  );
};

export default Input;
