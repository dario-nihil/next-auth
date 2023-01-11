import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import ProfileForm from "./profile-form";
import styles from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className={styles.profile}>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.replace("/auth");
    return;
  }

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
