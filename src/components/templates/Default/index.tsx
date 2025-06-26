import Header from "@/components/Header";
import { Outlet } from "react-router";

import styles from "./DefaultTemplate.module.scss";

const DefaultTemplate = () => {
  return (
    <div className={styles.template}>
      <Header />
      <section className={styles.section}>
        <main className="container">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default DefaultTemplate;
