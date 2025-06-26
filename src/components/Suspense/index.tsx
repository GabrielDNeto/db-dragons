import { Loader2 } from "lucide-react";

import styles from "./Suspense.module.scss";

const Suspense = () => {
  return (
    <div className={styles.suspense}>
      <Loader2 />
    </div>
  );
};

export default Suspense;
