import { ReactElement } from "react";

import { SettingsLayout } from "../../components/user-setting";
import { useUser } from "../../lib/hooks.lib";

function CoursesEnrolledSettingsPage() {
  var { user, error } = useUser();

  return (
    <main className="w-full flex flex-col items-center gap-2">
      <div className="w-full max-w-[800px] flex flex-col items-center py-4 gap-2">
        {!user && !error ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error encountered</div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}

CoursesEnrolledSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default CoursesEnrolledSettingsPage;
