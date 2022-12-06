import { ReactElement } from "react";

import InstructorSignup from "../../components/teacher-settings/instructor-signup";
import { SettingsLayout } from "../../components/user-setting";
import { useUser } from "../../lib/hooks.lib";

function TeacherSettingsPage() {
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
            <InstructorSignup />
          </>
        )}
      </div>
    </main>
  );
}

TeacherSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default TeacherSettingsPage;
