import Link from "next/link";
import { useSession } from "next-auth/react";

import styles from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && !status && (
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
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
