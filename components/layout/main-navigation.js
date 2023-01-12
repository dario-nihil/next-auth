import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import styles from "./main-navigation.module.css";

const MainNavigation = () => {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    signOut({ redirect: false });
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status === "unauthenticated" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
