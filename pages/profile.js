import { getToken } from "next-auth/jwt";
import { unstable_getServerSession } from "next-auth";

import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps = async (context) => {
  console.log(context);
  console.log("in profile");
  console.log("context");
  const token = await getToken({ req: context.req });
  console.log(token);
  // const session = await unstable_getServerSession(req, res);

  if (!token) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ProfilePage;
