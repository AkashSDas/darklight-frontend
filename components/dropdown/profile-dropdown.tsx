import { useRouter } from "next/router";
import { MouseEventHandler, ReactElement } from "react";

import Divider from "@components/editor/divider";
import { CollectionIcon, LogoutIcon, PlusIcon, SchoolBagIcon, StudentCardIcon, UserIcon } from "@components/icons";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { logoutThunk } from "@store/auth/thunk";
import { createCourseThunk } from "@store/editable-course/thunk";
import { selectUser } from "@store/user/slice";

import DropDown from "./";

function BasicDropdownItem({ onClick = null, icon, label }) {
  return (
    <div
      onClick={onClick}
      className="h-8 w-full rounded-sm flex items-center gap-[10px] hover:bg-grey2 active:bg-grey3 cursor-pointer px-[6px] py-1"
    >
      <span className="w-4 h-4">{icon}</span>
      <span className="-text-body2 text-grey7">{label}</span>
    </div>
  );
}

function BasicDropdownItemWithInfo({ icon, onClick = null, info, label }) {
  return (
    <div
      onClick={onClick}
      className="w-full rounded-md flex items-start gap-[10px] hover:bg-grey2 active:bg-grey3 cursor-pointer px-[6px] py-1"
    >
      <span className="w-4 h-4">{icon}</span>
      <div className="flex flex-col gap-[2px]">
        <div className="-text-body2 text-grey7">{label}</div>
        <div className="-text-cap text-grey6">{info}</div>
      </div>
    </div>
  );
}

function BasicDropdown() {
  var router = useRouter();
  var dispatch = useAppDispatch();

  async function createCourse() {
    var courseId = (await dispatch(createCourseThunk())).payload;
    if (courseId) router.push(`/course-editor/${courseId}`);
  }

  function Group({ children }) {
    return <div className="py-[6px]">{children}</div>;
  }

  function TeacherSection() {
    return (
      <Group>
        <BasicDropdownItem
          label="Become a Teacher"
          icon={<UserIcon className="fill-grey7" />}
        />
        <BasicDropdownItem
          label="My courses"
          icon={<CollectionIcon className="fill-grey7" />}
        />
        <BasicDropdownItem
          label="Create a course"
          onClick={createCourse}
          icon={<PlusIcon className="fill-grey7" />}
        />
      </Group>
    );
  }

  function UserSection() {
    var user = useAppSelector(selectUser).data;
    return (
      <Group>
        <BasicDropdownItemWithInfo
          label="Roles"
          icon={<StudentCardIcon className="fill-grey7" />}
          info={user?.roles
            ?.map((role) => `${role[0].toUpperCase()}${role.slice(1)}`)
            .join(" ")}
        />
        <BasicDropdownItem
          label="Logout"
          icon={<LogoutIcon className="fill-grey7" />}
          onClick={async function logout() {
            await dispatch(logoutThunk());
          }}
        />
      </Group>
    );
  }

  return (
    <div className="z-20 absolute top-[46px] right-0 w-[240px] px-1 py-[6px] rounded-md shadow-lg flex flex-col">
      <TeacherSection />
      <Divider height={1} />
      <BasicDropdownItem label="Courses enrolled in" icon={<SchoolBagIcon />} />
      <Divider height={1} />
      <UserSection />
    </div>
  );
}

function ProfileDropdown({ children }) {
  return (
    <DropDown clickable={children}>
      <BasicDropdown />
    </DropDown>
  );
}

export default ProfileDropdown;
