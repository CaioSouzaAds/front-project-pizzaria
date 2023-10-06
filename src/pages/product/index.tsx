import { Header } from '@/components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Product() {
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>New product</h1>

          <form className={styles.form}>
            <select name="" id="">
              <option value="" disabled selected hidden>
                Selecione a categoria
              </option>
              <option value="">Bebida</option>
              <option value="">Pizzas</option>
              <option value="">Sobremesas</option>
            </select>

            <input type="text" placeholder="Nome do item" className={styles.input} />
            <input type="text" placeholder="Valor" className={styles.input} />
            <textarea placeholder="Descrição" className={styles.input} />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
