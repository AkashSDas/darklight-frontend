import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import { createCourse } from "services/course.service";
import { instructorSignup } from "services/user.service";

import { TextBadge } from "@components/shared/text-badge";
import UserSettingsLayout from "@components/shared/user-settings-layout";
import { useUser } from "@lib/hooks.lib";

export default function TeacherSettingsPage(): JSX.Element {
  function Divider(): JSX.Element {
    return <hr className="w-full bg-border h-[1px] my-2" />;
  }

  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="py-4 w-full max-w-[800px] flex flex-col gap-2 items-center">
        <InstructorSignup />
        <Divider />
        <CreateCourse />
      </div>
    </main>
  );
}

function CreateCourse(): JSX.Element {
  var router = useRouter();
  var { user, accessToken } = useUser();
  var [loading, setLoading] = useState(false);

  async function create() {
    setLoading(true);

    var { success, id } = await createCourse(accessToken);
    if (success) {
      toast.success("Course created!");
      router.push(`/courses/${id}/settings`);
    } else toast.error("Failed to create course");

    setLoading(false);
  }

  return (
    <section className="w-full flex gap-2 justify-between items-center">
      <div className="w-full flex flex-col gap-2">
        <div>
          <TextBadge variant="regular">🏈</TextBadge>{" "}
          <span className="text-text1">Create course</span>
        </div>

        <p className="text-sm">
          Create a brand new empty course. Start editing!
        </p>
      </div>

      <div className="w-full max-w-[300px] flex gap-1 justify-end">
        <button
          onClick={create}
          disabled={loading || !user.roles.includes("teacher")}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </section>
  );
}

function InstructorSignup(): JSX.Element {
  var { user, accessToken } = useUser();
  var [loading, setLoading] = useState(false);

  async function signupAsInstructor() {
    setLoading(true);
    await instructorSignup(accessToken);
    toast.success("Signed up as instructor successfully");
    setLoading(false);
  }

  return (
    <section className="w-full flex gap-2 justify-between items-center">
      <div className="w-full flex flex-col gap-2">
        <div>
          <TextBadge variant="regular">🍁</TextBadge>{" "}
          <span className="text-text1">Become a teacher</span>
        </div>

        <p className="text-sm">
          Get permission to create and sell courses on DarkLight
        </p>
      </div>

      <div className="w-full max-w-[300px] flex gap-1 justify-end">
        {user.roles.includes("teacher") ? (
          <div className="text-light-primary">Already an instructor</div>
        ) : (
          <button
            className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
            onClick={signupAsInstructor}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Become an instructor"}
          </button>
        )}
      </div>
    </section>
  );
}

TeacherSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <UserSettingsLayout>{page}</UserSettingsLayout>;
};
