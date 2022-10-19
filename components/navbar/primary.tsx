import { useRouter } from "next/router";
import { useState } from "react";

import RenderAuth from "@components/auth/render-auth";
import FlatButton from "@components/buttons/flat-button";
import IconButton from "@components/buttons/icon-button";
import OutlineButton from "@components/buttons/outline-button";
import OutlineIconButton from "@components/buttons/outline-icon-button";
import TextIconButton from "@components/buttons/text-icon-button";
import ProfileDropdown from "@components/dropdown/profile-dropdown";
import { CompassIcon, DarkLight, GlobeIcon, SearchIcon, SettingsIcon } from "@components/icons";
import SettingsModal from "@components/modal/settings";
import UserProfile from "@components/user/profile-pic";
import { oauthSignup } from "@lib/oauth";
import Google from "@public/brand-svg/google.svg";
import styles from "@styles/components/navbar/primary.module.scss";

function PrimaryNavbar() {
  var router = useRouter();
  var [isOpen, setIsOpen] = useState(false);

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
        <IconButton icon={<SettingsIcon />} onClick={() => setIsOpen(true)} />
        <ProfileDropdown>
          <UserProfile />
        </ProfileDropdown>
      </RenderAuth>
    );
  }

  return (
    <>
      <nav className={styles.container}>
        <DarkLight />

        <div className={styles.mid_items}>
          <TextIconButton icon={<GlobeIcon />} label="Explore" />
          <TextIconButton icon={<CompassIcon />} label="Teach" />
          <TextIconButton icon={<SearchIcon />} label="Search" />
        </div>

        <div className={styles.right_items}>
          <AuthElements />
          <ActionElement />
        </div>
      </nav>

      {isOpen ? <SettingsModal handleClose={() => setIsOpen(false)} /> : null}
    </>
  );
}

export default PrimaryNavbar;
