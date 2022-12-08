import { useState } from "react";
import toast from "react-hot-toast";

import { useUser } from "../../lib/hooks.lib";
import { instructorSignup } from "../../services/user.service";
import { TextBadge } from "../badges/text";
import { RegularButton } from "../button/regular";

export default function InstructorSignup() {
  var { user, accessToken } = useUser();
  var [loading, setLoading] = useState(false);

  async function signupAsInstructor() {
    setLoading(true);
    await instructorSignup(accessToken);
    toast.success("Signed up as instructor successfully");
    setLoading(false);
  }

  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
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
          <RegularButton onClick={signupAsInstructor} variant="contained">
            {loading ? "Signing up..." : "Become an instructor"}
          </RegularButton>
        )}
      </div>
    </section>
  );
}
