import { useAppSelector } from "@hooks/store";
import styles from "@styles/components/user/profile-pic.module.scss";

function UserProfile() {
  var user = useAppSelector((state) => state.user.data);

  return (
    <div className={styles.container}>
      <img
        src={user?.profileImage?.URL ?? "/posters/user.svg"}
        alt={user?.fullName}
      />
    </div>
  );
}

export default UserProfile;
