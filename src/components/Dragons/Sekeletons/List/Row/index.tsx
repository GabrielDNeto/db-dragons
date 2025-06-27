import styles from "./RowSkeleton.module.scss";

const RowSkeleton = () => {
  return (
    <div className={styles.row} data-testid="row-skeleton">
      <div className={styles.info}>
        <div className={styles.profile}>
          <div className={styles.skeletonImg} />
          <div className={styles.skeletonText} style={{ width: "50%" }} />
        </div>

        <div>
          <div className={styles.skeletonText} style={{ width: "50%" }} />
        </div>

        <div>
          <div className={styles.skeletonText} style={{ width: "50%" }} />
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.skeletonAction} />
      </div>
    </div>
  );
};

export default RowSkeleton;
