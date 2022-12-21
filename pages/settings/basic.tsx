import { ReactElement } from "react";

import BasicUserInfoSettings from "@components/settings/basic-user-info-settings";
import UserSettingsLayout from "@components/shared/user-settings-layout";

export default function BasicSettingsPage(): JSX.Element {
  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="py-4 w-full max-w-[800px] flex flex-col gap-2 items-center">
        <BasicUserInfoSettings />
      </div>
    </main>
  );
}

BasicSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <UserSettingsLayout>{page}</UserSettingsLayout>;
};
