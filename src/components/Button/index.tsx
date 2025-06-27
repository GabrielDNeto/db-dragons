import clsx from "clsx";
import styles from "./Button.module.scss";

const Button = ({
  className,
  disabled,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(styles.button, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
