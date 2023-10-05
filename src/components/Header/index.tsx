import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '@/contexts/AuthContext';

export function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image src="/logo.png" width={60} height={60} alt="logo" />
        </Link>

        <nav className={styles.menuNave}>
          <Link href="/category">
            <p className={styles.menuLink}>Categoria</p>
          </Link>

          <Link href="/product">
            <p className={styles.menuLinkWithMargin}>Cardápio</p>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24}></FiLogOut>
          </button>
        </nav>
      </div>
    </header>
  );
}
