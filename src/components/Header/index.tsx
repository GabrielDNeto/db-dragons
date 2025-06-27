import clsx from "clsx";

import logoIcon from "@/assets/icons/dragon-horizontal.png";
import { APP_ROUTES } from "@/config/router/routes";

import { DoorClosed, UserCircle } from "lucide-react";
import { Link } from "react-router";

import Dropdown from "../Dropdown";

import { useAuth } from "@/hooks/useAuth";
import styles from "./Header.module.scss";

const Header = () => {
  const { handleLogout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={clsx("container", styles.headerWrapper)}>
        <Link to={APP_ROUTES.private.dragons}>
          <img src={logoIcon} alt="Dragon Icon" />
        </Link>

        <Dropdown
          options={[
            {
              label: "Sair",
              icon: <DoorClosed size={16} />,
              onClick: handleLogout,
            },
          ]}
        >
          <UserCircle size={24} />
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
