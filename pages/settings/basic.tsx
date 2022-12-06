import { ReactElement } from "react";

import { InfoForm, SettingsLayout } from "../../components/user-setting";
import OAuthProviderInfo from "../../components/user-setting/oauth-provider-info.component";
import { useUser } from "../../lib/hooks.lib";

function BasicSettingsPage() {
  var { user, error } = useUser();

  return (
    <main className="w-full flex flex-col items-center gap-2">
      <div className="w-full max-w-[800px] flex flex-col items-center py-4 gap-2">
        {!user && !error ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error encountered</div>
        ) : (
          <>
            <InfoForm />
            <hr className="w-full bg-border h-[1px] my-2" />
            <OAuthProviderInfo />
          </>
        )}
      </div>
    </main>
  );
}

BasicSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default BasicSettingsPage;
