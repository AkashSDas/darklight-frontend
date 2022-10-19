import { useRouter } from "next/router";
import { MouseEventHandler, ReactElement } from "react";

import { CollectionIcon, LogoutIcon, PlusIcon, SchoolBagIcon, StudentCardIcon, UserIcon } from "@components/icons";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { logoutThunk } from "@store/auth/thunk";
import { createCourseThunk } from "@store/editable-course/thunk";

import DropDown from "./";

function ProfilePicDropdown({ children }) {
  var user = useAppSelector((state) => state.user.data);
  var dispatch = useAppDispatch();
  var router = useRouter();

  function Divider() {
    return <div className="w-full h-[1px] rounded-full bg-grey5"></div>;
  }

  function Group({ children }) {
    return <div className="py-[6px]">{children}</div>;
  }

  function DropdownItem({
    children,
    label,
    onClick,
  }: {
    children: ReactElement;
    label: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
  }) {
    return (
      <div
        onClick={onClick}
        className="h-7 w-full rounded-md flex items-center gap-[10px] hover:bg-grey2 active:bg-grey3 cursor-pointer px-[6px] py-1"
      >
        {children}
        <div className="text-[14px] text-grey7">{label}</div>
      </div>
    );
  }

  function TeachGroup() {
    return (
      <Group>
        <DropdownItem label="Become a Teacher">
          <UserIcon className="w-4 h-4" />
        </DropdownItem>
        <DropdownItem label="My courses">
          <CollectionIcon className="w-4 h-4" />
        </DropdownItem>
        <DropdownItem
          onClick={async function createCourse() {
            var courseId = (await dispatch(createCourseThunk())).payload;
            if (courseId) router.push(`/course-editor/${courseId}`);
          }}
          label="Create a course"
        >
          <PlusIcon className="w-4 h-4" />
        </DropdownItem>
      </Group>
    );
  }

  return (
    <DropDown clickable={children}>
      <div className="z-20 absolute top-[46px] right-0 w-[240px] px-1 py-[6px] rounded-md shadow-lg flex flex-col">
        <TeachGroup />
        <Divider />
        <Group>
          <DropdownItem label="Courses enrolled in">
            <SchoolBagIcon className="w-4 h-4" />
          </DropdownItem>
        </Group>
        <Divider />

        <Group>
          <div className="w-full rounded-md flex items-start gap-[10px] hover:bg-grey2 active:bg-grey3 cursor-pointer px-[6px] py-1">
            <StudentCardIcon className="w-4 h-4" />
            <div className="flex flex-col gap-[2px]">
              <div className="text-[14px] text-grey7 leading-[14px]">Roles</div>
              <div className="text-[12px] text-grey6">
                {user?.roles
                  ?.map((role) => {
                    return `${role[0].toUpperCase()}${role.slice(1)}`;
                  })
                  .join(" ")}
              </div>
            </div>
          </div>

          <div
            className="h-7 w-full rounded-md flex items-center gap-[10px] hover:bg-grey2 active:bg-grey3 cursor-pointer px-[6px] py-1"
            onClick={async () => {
              await dispatch(logoutThunk());
            }}
          >
            <LogoutIcon className="w-4 h-4" />
            <div className="text-[14px] text-grey6">Logout</div>
          </div>
        </Group>
      </div>
    </DropDown>
  );
}

export default ProfilePicDropdown;
