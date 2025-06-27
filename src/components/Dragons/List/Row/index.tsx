import type { Dragon } from "@/@types/dragon";
import dayjs from "dayjs";

import fallbackImg from "@/assets/icons/dragon-icon.png";

import Dropdown from "@/components/Dropdown";
import { Edit, MoreVertical, Trash } from "lucide-react";
import styles from "./Row.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDragon } from "@/services/dragons";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "@/config/router/routes";
import RowSkeleton from "../../Sekeletons/List/Row";

const Row = ({ dragon }: { dragon: Dragon }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleHistory = (histories: string | string[]) => {
    if (Array.isArray(histories)) {
      if (histories.length > 0) {
        return histories.join(" ");
      } else {
        return "-";
      }
    }

    if (typeof histories === "string") {
      return histories;
    }

    return "-";
  };

  const deleteDragonMutation = useMutation({
    mutationFn: deleteDragon,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dragons"] }),
  });

  const dropdownOptions = [
    {
      label: "Editar",
      icon: <Edit size={16} />,
      onClick: () => navigate(`${APP_ROUTES.private.dragons}/${dragon.id}`),
    },
    {
      label: "Excluir",
      icon: <Trash size={16} />,
      onClick: () => deleteDragonMutation.mutate(dragon.id),
    },
  ];

  if (deleteDragonMutation.isPending) return <RowSkeleton />;

  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <div className={styles.profile}>
          <img
            src={dragon.imageUrl || fallbackImg}
            alt={dragon.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImg;
            }}
          />
          <h3>{dragon.name}</h3>
        </div>

        <div>
          <span className={styles.history}>
            {handleHistory(dragon.histories)}
          </span>
        </div>

        <div>
          <span>{dayjs(dragon.createdAt).format("DD/MM/YYYY")}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Dropdown options={dropdownOptions}>
          <MoreVertical size={18} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Row;
