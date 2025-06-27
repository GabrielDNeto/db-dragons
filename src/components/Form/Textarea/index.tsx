import clsx from "clsx";

import styles from "./Textarea.module.scss";

const Textarea = ({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea className={clsx(className, styles.textarea)} {...props} />;
};

export default Textarea;
