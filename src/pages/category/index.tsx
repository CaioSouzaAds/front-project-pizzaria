import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';
import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';

import { setupApiClient } from '@/services/api';

export default function Category() {
  const [name, setName] = useState('');

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name == '') {
      return;
    }

    const apiClient = setupApiClient();
    await apiClient.post('/category', {
      name: name,
    });

    toast.success('Categoria cadastarda com sucesso!');
    setName('');
  }

  return (
    <>
      <Head>
        <title>New Category</title>
      </Head>

      <div>
        <Header />
        <main className={styles.container}>
          <h1>Register new Categories</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
