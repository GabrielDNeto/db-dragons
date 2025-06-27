import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/Button";
import Input from "@/components/Form/Input";

import bgDragon from "@/assets/imgs/signin-bg.jpg";

import styles from "./Signin.module.scss";
import { useMutation } from "@tanstack/react-query";
import { signin } from "@/services/auth";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const signinSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(1, "Insira sua senha"),
});

type SigninData = z.infer<typeof signinSchema>;

const Signin = () => {
  const { handleAuthenticate } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signinMutation = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      handleAuthenticate(data.access_token);
    },
    onError: () => {
      toast.error("Email ou senha inválidos!");
    },
  });

  const handleSignin = (data: SigninData) => {
    signinMutation.mutateAsync(data);
  };

  return (
    <section className={styles.signinContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.title}>
          <h1>Entrar</h1>
          <span>Acesse e torne-se mestre dos dragões</span>
        </div>

        <form onSubmit={handleSubmit(handleSignin)}>
          <div>
            <Input
              placeholder="Seu e-mail"
              hasError={!!errors.email}
              {...register("email", { required: true })}
            />
            {errors.email?.message && <span>{errors.email?.message}</span>}
          </div>
          <div>
            <Input
              variant="password"
              placeholder="Sua senha"
              hasError={!!errors.password}
              {...register("password", { required: true })}
            />
            {errors.password?.message && (
              <span>{errors.password?.message}</span>
            )}
          </div>
          <Button>Fazer Login</Button>
        </form>
      </div>
      <div className={styles.imageWrapper}>
        <img src={bgDragon} alt="Fire Dragon" />
      </div>
    </section>
  );
};

export default Signin;
