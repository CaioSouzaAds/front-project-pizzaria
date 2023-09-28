import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { parseCookies } from 'nookies';

// Function for pages that only visitors have access to.

export function canSSRGuest<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    // Se se o usuário tentar acessar a pagina,tendo já um login salvo redirecionamos

    if (cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
