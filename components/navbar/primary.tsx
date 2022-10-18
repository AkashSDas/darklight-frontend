import { useRouter } from "next/router";

import RenderAuth from "@components/auth/render-auth";
import FlatButton from "@components/buttons/flat-button";
import IconButton from "@components/buttons/icon-button";
import OutlineButton from "@components/buttons/outline-button";
import OutlineIconButton from "@components/buttons/outline-icon-button";
import TextIconButton from "@components/buttons/text-icon-button";
import DropDown from "@components/dropdown";
import ProfilePicDropdown from "@components/dropdown/profile-pic";
import { CollectionIcon, CompassIcon, DarkLight, GlobeIcon, PlusIcon, SearchIcon, SettingsIcon, UserIcon } from "@components/icons";
import UserProfile from "@components/user/profile-pic";
import { oauthSignup } from "@lib/oauth";
import Google from "@public/brand-svg/google.svg";
import styles from "@styles/components/navbar/primary.module.scss";

function PrimaryNavbar() {
  var router = useRouter();

  function AuthElements() {
    return (
      <>
        {/* Login button */}
        <RenderAuth onAuth={false}>
          <OutlineButton
            size="sm"
            label="Login"
            onClick={() => router.push("/login")}
          />
        </RenderAuth>

        {/* Google signup button */}
        <RenderAuth onAuth={false}>
          <OutlineIconButton
            icon={<Google />}
            onClick={() => oauthSignup("google")}
          />
        </RenderAuth>

        {/* Signup button */}
        <RenderAuth onAuth={false}>
          <FlatButton
            size="sm"
            label="Signup"
            onClick={() => router.push("/signup")}
          />
        </RenderAuth>
      </>
    );
  }

  function ActionElement() {
    return (
      <RenderAuth onAuth={true}>
        <IconButton icon={<SettingsIcon className="h-6 w-6" />} />
        <ProfilePicDropdown>
          <UserProfile />
        </ProfilePicDropdown>
      </RenderAuth>
    );
  }

  return (
    <nav className={styles.container}>
      <DarkLight />

      <div className={styles.mid_items}>
        <TextIconButton size="sm" icon={<GlobeIcon />} label="Explore" />
        <TextIconButton size="sm" icon={<CompassIcon />} label="Teach" />
        <TextIconButton size="sm" icon={<SearchIcon />} label="Search" />
      </div>

      <div className={styles.right_items}>
        <AuthElements />
        <ActionElement />
      </div>
    </nav>
  );
}

export default PrimaryNavbar;
