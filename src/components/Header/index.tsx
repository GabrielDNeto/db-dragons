import clsx from "clsx";

import logoIcon from "@/assets/icons/dragon-horizontal.png";
import { APP_ROUTES } from "@/config/router/routes";

import { Link } from "react-router";
import { UserCircle } from "lucide-react";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={clsx("container", styles.headerWrapper)}>
        <Link to={APP_ROUTES.private.dragons}>
          <img src={logoIcon} alt="Dragon Icon" />
        </Link>

        <UserCircle size={24} />
      </div>
    </header>
  );
};

export default Header;
