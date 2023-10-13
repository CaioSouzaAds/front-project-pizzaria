import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiUpload } from 'react-icons/fi';

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

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
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#FFF" />
              </span>

              <input type="file" accept="image/png , image/jpeg" onChange={handleFile} />

              {avatarUrl && (
                <Image
                  className={styles.preview}
                  src={avatarUrl}
                  alt="product photo"
                  width={200}
                  height={200}
                />
              )}
            </label>

            <select name="" id="">
              <option value="" disabled selected hidden>
                {/* Opção inicial: informativa, inacessível, pré-selecionada e invisível (disabled, selected, hidden). */}
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
