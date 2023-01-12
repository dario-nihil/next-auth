import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import AuthForm from "../components/auth/auth-form";

const AuthPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/");
    return <p>Loading...</p>;
  }

  return <AuthForm />;
};

export default AuthPage;
