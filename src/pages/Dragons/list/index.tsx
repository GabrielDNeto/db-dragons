import Input from "@/components/Form/Input";

import styles from "./Dragons.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllDragons } from "@/services/dragons";
import Row from "@/components/Dragons/List/Row";
import { useMemo } from "react";

const Dragons = () => {
  const { data: dragons } = useQuery({
    queryKey: ["dragons"],
    queryFn: getAllDragons,
    refetchOnWindowFocus: false,
  });

  const dragonsOrderByAsc = useMemo(
    () => dragons?.data.sort((a, b) => a.name.localeCompare(b.name)) || [],
    [dragons],
  );

  return (
    <div className={styles.content}>
      <div className={styles.pageHeader}>
        <div className={styles.title}>
          <h1>Dragões</h1>
          <span>Explore os dragões mais poderosos do mundo</span>
        </div>

        <form>
          <Input placeholder="Busque pelo nome..." variant="search" />
        </form>
      </div>

      <div className={styles.list}>
        <div className={styles.listHeader}>
          <div>
            <span>Dragão</span>
            <span>História</span>
            <span>Criado em</span>
          </div>
          <span>Ações</span>
        </div>
        <div className={styles.listContent}>
          {dragonsOrderByAsc.map((dragon) => (
            <Row key={dragon.id} dragon={dragon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dragons;
