import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/home.module.scss";
import { Input } from "../../components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

import logoImg from "../../../public/newlogo.png";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={logoImg} alt="Logo pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form>
            <Input placeholder="Digite seu nome" type="text" />

            <Input placeholder="Digite seu email" type="text" />

            <Input
              placeholder="Sua senha"
              type={showPassword ? "text" : "password"}
            />

            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Mostrar Senha
            </label>

            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>

          <Link className={styles.text} href={"/"}>
            Já possui uma conta? Faça login!
          </Link>
        </div>
      </div>
    </>
  );
}
