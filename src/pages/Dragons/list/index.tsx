import Input from "@/components/Form/Input";

import Button from "@/components/Button";
import Row from "@/components/Dragons/List/Row";
import { getAllDragons } from "@/services/dragons";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./Dragons.module.scss";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "@/config/router/routes";
import RowSkeleton from "@/components/Dragons/Sekeletons/List/Row";

const Dragons = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const { data: dragons, isLoading } = useQuery({
    queryKey: ["dragons"],
    queryFn: getAllDragons,
    refetchOnWindowFocus: false,
  });

  const dragonsOrderByAsc = useMemo(
    () =>
      dragons?.data
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((dragon) => dragon.name.includes(search)) || [],
    [dragons, search],
  );

  return (
    <div className={styles.content}>
      <div className={styles.pageHeader}>
        <div className={styles.title}>
          <h1>Dragões</h1>
          <span>Explore os dragões mais poderosos do mundo</span>
        </div>

        <div className={styles.actions}>
          <div>
            <Input
              placeholder="Busque pelo nome..."
              variant="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            onClick={() => navigate(`${APP_ROUTES.private.dragons}/create`)}
          >
            <Plus size={18} />
            Adicionar Dragão
          </Button>
        </div>
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
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)
          ) : !!dragonsOrderByAsc.length ? (
            dragonsOrderByAsc.map((dragon) => (
              <Row key={dragon.id} dragon={dragon} />
            ))
          ) : (
            <span style={{ textAlign: "center" }}>
              Nenhum dragão encontrado
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dragons;
