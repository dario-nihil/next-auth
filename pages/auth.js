import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import AuthForm from "../components/auth/auth-form";

const AuthPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/");
    return <p>Loading...</p>;
  }

  return <AuthForm />;
};

export default AuthPage;
