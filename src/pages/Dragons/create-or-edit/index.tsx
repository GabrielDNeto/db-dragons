import { useNavigate, useParams } from "react-router";

import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import styles from "./CreateOrEditDragon.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDragon, getDragonById, updateDragon } from "@/services/dragons";
import { APP_ROUTES } from "@/config/router/routes";
import { useEffect } from "react";
import { toast } from "sonner";

const dragonSchema = z.object({
  imageUrl: z.string().optional(),
  name: z.string().min(1, "Insira um nome"),
  type: z.string().min(1, "Insira o tipo"),
  histories: z
    .array(z.string().min(1, "Insira uma história válida"))
    .min(1, "Insira uma história"),
});

type DragonData = z.infer<typeof dragonSchema>;

const CreateOrEditDragon = () => {
  const { id } = useParams();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<DragonData>({
    resolver: zodResolver(dragonSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
      type: "",
      histories: [""],
    },
  });

  const watchImageUrl = watch("imageUrl");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "histories" as never,
  });

  const navigate = useNavigate();

  const { data: dragonById } = useQuery({
    queryKey: ["dragon", id],
    refetchOnWindowFocus: false,
    queryFn: () => getDragonById(id || ""),
    enabled: !!id,
  });

  const createDragonMutation = useMutation({
    mutationFn: createDragon,
    onSuccess: () => {
      toast.success("Dragão cadastrado com sucesso!");
      navigate(APP_ROUTES.private.dragons);
    },
    onError: () => {
      toast.error("Erro ao cadastrar dragão!");
    },
  });

  const updateDragonMutation = useMutation({
    mutationFn: updateDragon,
    onSuccess: () => {
      toast.success("Dragão salvo com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar dragão!");
    },
  });

  const onSubmit = (data: DragonData) => {
    if (!id) {
      createDragonMutation.mutate(data);
    } else {
      updateDragonMutation.mutate({ id, ...data });
    }
  };

  const isSubmiting =
    createDragonMutation.isPending || updateDragonMutation.isPending;

  useEffect(() => {
    if (id && dragonById) {
      const { name, type, imageUrl, histories } = dragonById.data;
      const values = {
        name,
        type,
        imageUrl,
        histories: Array.isArray(histories) ? histories : [histories],
      };

      reset(values);
    }
  }, [dragonById]);

  return (
    <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <h1>{id ? "Editar Dragão" : "Adicionar Dragão"}</h1>
        <Button type="submit">
          {isSubmiting ? (
            <Loader2 size={16} className={styles.loader} />
          ) : (
            <Check size={16} />
          )}
          {id ? "Salvar" : "Cadastrar"}
        </Button>
      </div>

      <div className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Informações</h3>

          <div>
            <Input placeholder="URL Imagem" {...register("imageUrl")} />
          </div>

          <div>
            <Input
              placeholder="Nome do Dragão"
              hasError={!!errors.name}
              {...register("name", { required: true })}
            />
            {errors.name?.message && <span>{errors.name.message}</span>}
          </div>

          <div>
            <Input
              placeholder="Tipo do Dragão (Ex.: Aquático)"
              hasError={!!errors.type}
              {...register("type", { required: true })}
            />
            {errors.type?.message && <span>{errors.type.message}</span>}
          </div>

          <div className={styles.histories}>
            <div className={styles.historiesHeader}>
              <h3>Histórias</h3>
              <Button
                type="button"
                onClick={() => append("")}
                disabled={fields.length >= 3}
              >
                <Plus />
                História
              </Button>
            </div>
            <div className={styles.historiesList}>
              {fields.map((field, index) => (
                <div key={field.id} className={styles.historyItem}>
                  <Button
                    className={styles.historyRemoveButton}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <Trash size={16} />
                  </Button>
                  <div>
                    <Textarea
                      placeholder={`História #${index + 1}`}
                      {...register(`histories.${index}`)}
                    />
                    {errors.histories?.[index]?.message && (
                      <span>{errors.histories[index]?.message}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {errors.histories?.root?.message && (
              <span>{errors.histories?.root?.message}</span>
            )}
          </div>
        </div>

        {watchImageUrl ? (
          <img src={watchImageUrl} />
        ) : (
          <div className={styles.imgSuspense}>
            <span>Adicione uma url de imagem</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default CreateOrEditDragon;
