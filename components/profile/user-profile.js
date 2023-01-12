import ProfileForm from "./profile-form";
import styles from "./user-profile.module.css";

const UserProfile = () => {
  // Redirect away if NOT auth

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
};

export default UserProfile;
