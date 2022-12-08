import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

import { useUser } from "../../lib/hooks.lib";
import { createCourse } from "../../services/course.service";
import { TextBadge } from "../badges/text";
import { RegularButton } from "../button/regular";

export default function CreateCourse() {
  var { user, accessToken } = useUser();
  var [loading, setLoading] = useState(false);
  var router = useRouter();

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
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div>
          <TextBadge variant="regular">🏈</TextBadge>{" "}
          <span className="text-text1">Create course</span>
        </div>

        <p className="text-sm">
          Create a brand new empty course. Start editing!
        </p>
      </div>

      <div className="w-full max-w-[300px] flex gap-1 justify-end">
        <RegularButton
          onClick={create}
          variant="outline"
          disabled={loading || !user.roles.includes("teacher")}
        >
          {!loading ? "Create" : "Creating..."}
        </RegularButton>
      </div>
    </section>
  );
}
