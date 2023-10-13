import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token');
    Router.push('/');
  } catch {
    console.log('error when exiting');
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
  });
  const isAuthenticated = !!user;

  useEffect(() => {
    // Buscar o token nos cookies
    const { '@nextauth.token': token } = parseCookies();

    const fetchUser = async () => {
      try {
        if (token) {
          // Fazer a requisição à API para buscar informações do usuário
          const response = await api.get('/me');
          const { id, name, email } = response.data;

          // Definir as informações do usuário no estado do componente
          setUser({
            id,
            name,
            email,
          });
        }
      } catch (error) {
        // Tratar erros na requisição à API
        console.error('Erro ao buscar usuário:', error);

        // Realizar o logout do usuário em caso de erro
        signOut();
      }
    };

    // Chamar a função fetchUser para buscar os dados do usuário
    fetchUser();
  }, []); // Este efeito é executado uma vez quando o componente é montado

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password,
      });
      //console.log(response.data);
      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 Mês
        path: '/', // Quais caminhos terão acesso ao cookie
      });

      setUser({
        id,
        name,
        email,
      });

      //Passar o token para as proximas requisições
      //@ts-ignore Element implicitly has an 'any' type because expression of type '"Authorization"' can't be used to index type 'HeadersDefaults'.Property 'Authorization' does not exist on type 'HeadersDefaults'.
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Login realizado com sucesso.');

      //Redirecionar o usuário para /dashboard
      Router.push('/dashboard');
    } catch (error) {
      toast.error('Login ou senha incorretos, verifique.');
      console.log('Erro ao acessar', error);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password,
      });

      toast.success('CADASTRADO COM SUCESSO!');

      Router.push('/');
    } catch (err) {
      toast.error('ERRO DE CADASTRO');
      console.log('Erro ao cadastrar ', err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
