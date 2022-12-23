import { ReactElement } from "react";

import BasicUserInfoSettings from "@components/settings/basic-user-info-settings";
import OAuthProviderInfo from "@components/settings/oauth-provider-info";
import UserSettingsLayout from "@components/shared/user-settings-layout";

export default function BasicSettingsPage(): JSX.Element {
  function Divider(): JSX.Element {
    return <hr className="w-full bg-border h-[1px] my-2" />;
  }

  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="py-4 w-full max-w-[800px] flex flex-col gap-2 items-center">
        <BasicUserInfoSettings />
        <Divider />
        <OAuthProviderInfo />
      </div>
    </main>
  );
}

BasicSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <UserSettingsLayout>{page}</UserSettingsLayout>;
};
