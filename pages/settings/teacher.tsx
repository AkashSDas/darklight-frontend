import { ReactElement } from "react";

import CreateCourse from "../../components/teacher-settings/create-course";
import InstructorSignup from "../../components/teacher-settings/instructor-signup";
import { SettingsLayout } from "../../components/user-setting/layout";
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
            <hr className="w-full bg-border h-[1px] my-2" />
            <CreateCourse />
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
