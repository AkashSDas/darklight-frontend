import { ReactElement } from "react";

import UserSettingsLayout from "@components/shared/user-settings-layout";

export default function BillingPage(): JSX.Element {
  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="py-4 w-full max-w-[800px] flex flex-col gap-2 items-center">
        <p>Billing page</p>
      </div>
    </main>
  );
}

BillingPage.getLayout = function getLayout(page: ReactElement) {
  return <UserSettingsLayout>{page}</UserSettingsLayout>;
};
