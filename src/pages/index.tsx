import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import { Input } from "../components/ui/Input";

import logoImg from "../../public/logo.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzaria Sabores da Sicília - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo pizzaria" />
      </div>

      <div className={styles.login}>
        <form>
          <Input placeholder="Digite seu email" type="text" />

          <Input placeholder="Sua senha" type="password" />
        </form>
      </div>
    </>
  );
}
