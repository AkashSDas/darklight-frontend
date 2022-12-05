import { ReactElement } from "react";

import { SettingsLayout } from "../../components/user-setting";

function BasicSettingsPage() {
  return (
    <div>
      <h1>Settings page</h1>
    </div>
  );
}

BasicSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default BasicSettingsPage;
