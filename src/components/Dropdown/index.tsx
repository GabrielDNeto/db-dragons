import type React from "react";

import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";

type Option = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

type DropdownProps = {
  children: React.ReactNode;
  options: Option[];
};

const Dropdown = ({ children, options }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={() => setOpen((prev) => !prev)}>{children}</button>

      {open && (
        <div className={styles.dropdownMenu}>
          {options.map((opt) => (
            <button onClick={opt.onClick}>
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
