import { useContext, FormEvent, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '@/styles/home.module.scss';
import { Input } from '../components/ui/Input';
import { Button } from '@/components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';

import { toast } from 'react-toastify';

import logoImg from '../../public/newlogo.png';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  console.log(email);
  console.log(password);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.error('VERIFIQUE OS CAMPOS.');
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
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
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Mostrar Senha
            </label>

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link className={styles.text} href={'/signup'}>
            Não possui uma conta? Cadastra-se
          </Link>
        </div>
      </div>
    </>
  );
}
