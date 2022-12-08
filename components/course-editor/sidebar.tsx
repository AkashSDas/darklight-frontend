import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

import { useEditableCourse, useUser } from "../../lib/hooks.lib";
import Logo from "../../public/logo.svg";
import { addGroup } from "../../services/group.service";
import { EyeIcon } from "../icons/eye";
import { MobileIcon } from "../icons/mobile";
import { PaymentCardIcon } from "../icons/payment-card";
import { SettingsIcon } from "../icons/settings";
import { UserCircleIcon } from "../icons/user-circle";

export default function Sidebar() {
  var router = useRouter();
  var [addingGroup, setAddingGroup] = useState(false);
  var { accessToken } = useUser();
  var { courseId, mutateCourse } = useEditableCourse();

  async function createGroup() {
    if (courseId && accessToken) {
      setAddingGroup(true);

      var newData = await mutateCourse(async (oldData) => {
        var response = await addGroup(courseId, accessToken);

        if (!response.success) {
          return {
            success: false,
            error: "Failed to create group",
            course: oldData?.course,
          };
        }

        return {
          success: true,
          error: null,
          course: {
            ...oldData?.course,
            groups: [...oldData?.course?.groups, response.group],
          },
        };
      });

      setAddingGroup(false);

      if (!newData?.success) {
        toast.error(newData?.error ?? "Failed to create group");
      } else {
        toast.success("Group created");
        let newGroup = newData.course.groups[newData.course.groups.length - 1];
        router.push(`/courses/${courseId}/groups/${newGroup._id}`);
      }
    }
  }

  return (
    <aside className="w-[300px] flex flex-col gap-4 pt-4 h-full fixed border border-solid border-border">
      <div className="h-[34px] flex items-center px-4">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>

      <ul>
        <SidebarItem
          id="settings"
          icon={<SettingsIcon size="18" />}
          label="Basic settings"
        />
        <SidebarItem
          id="permission"
          icon={<UserCircleIcon size="18" />}
          label="Permission"
        />
        <SidebarItem
          id="billing"
          icon={<PaymentCardIcon size="18" />}
          label="Services & Billing"
        />
        <SidebarItem
          id="preview"
          icon={<EyeIcon size="18" />}
          label="Public view"
        />
        <SidebarItem
          id="overview"
          icon={<MobileIcon size="18" />}
          label="Course overview"
        />
      </ul>

      <Groups />

      <button
        disabled={addingGroup}
        onClick={createGroup}
        className="mt-auto bg-[#E1E4FF] w-full h-11 flex items-center justify-center text-primary font-urbanist font-medium hover:brightness-95 active:brightness-90"
      >
        {addingGroup ? "Creating..." : "Add group"}
      </button>
    </aside>
  );
}

function Groups() {
  var { course } = useEditableCourse();

  return (
    <ul className="mt-4">
      {course?.groups.map((group: any) => (
        <div key={group._id}>{group.title ?? "Untitled"}</div>
      ))}
    </ul>
  );
}

function SidebarItem({
  id,
  label,
  icon,
}: {
  id: string;
  label: string;
  icon: JSX.Element;
}) {
  var router = useRouter();
  var { courseId } = useEditableCourse();

  return (
    <Link href={`/courses/${courseId}/${id}`}>
      <li
        className={`${
          router.pathname?.includes(id) && "bg-background3"
        } text-[#555555] h-11 w-full flex items-center px-4 gap-3 cursor-pointer hover:bg-background3 active:bg-border`}
      >
        <div>{icon}</div>
        <div>{label}</div>
      </li>
    </Link>
  );
}
