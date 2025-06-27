import { useParams } from "react-router";

import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import styles from "./CreateOrEditDragon.module.scss";

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

  const onSubmit = (data: DragonData) => console.log("data", data);

  return (
    <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <h1>{id ? "Editar Dragão" : "Adicionar Dragão"}</h1>
        <Button type="submit">
          <Check size={16} />
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
              {...register("name", { required: true })}
            />
          </div>

          <div>
            <Input
              placeholder="Tipo do Dragão (Ex.: Aquático)"
              {...register("type", { required: true })}
            />
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

            {errors.histories?.message && (
              <span>{errors.histories.message}</span>
            )}
          </div>
        </div>

        {watchImageUrl ? (
          <img src={watchImageUrl} />
        ) : (
          <div className={styles.imgSuspense} />
        )}
      </div>
    </form>
  );
};

export default CreateOrEditDragon;
