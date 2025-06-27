import clsx from "clsx";
import styles from "./Button.module.scss";

const Button = ({
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(styles.button, className)}
      disabled={disabled}
      {...props}
    ></button>
  );
};

export default Button;
