import { useContext, FormEvent, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import { Input } from '../../components/ui/Input';
import { Button } from '@/components/ui/Button';

import logoImg from '../../../public/newlogo.png';

import { AuthContext } from '../../contexts/AuthContext';

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      alert('Dados incorretos, verifique e tente novamente');
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={logoImg} alt="Logo pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Digite seu email"
              type="email"
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
              Cadastrar
            </Button>
          </form>

          <Link className={styles.text} href={'/'}>
            Já possui uma conta? Faça login!
          </Link>
        </div>
      </div>
    </>
  );
}
