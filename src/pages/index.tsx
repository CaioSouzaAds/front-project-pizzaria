import { useContext, FormEvent } from "react";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/home.module.scss";
import { Input } from "../components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

import logoImg from "../../public/newlogo.png";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email: "algum@email.com",
      password: "123123",
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Pizzaria Sabores da Sicília - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={logoImg} alt="Logo pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>
          </form>

          <Link className={styles.text} href={"/signup"}>
            Não possui uma conta? Cadastra-se
          </Link>
        </div>
      </div>
    </>
  );
}
