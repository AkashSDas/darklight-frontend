import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector, useDropdown } from "@lib/hooks";
import { logoutThunk } from "@store/auth/thunk";
import { createCourseThunk } from "@store/course/thunk";
import { selectUserData } from "@store/user/slice";
import { instructorSignupThunk } from "@store/user/thunk";

import Avatar from "./avatar";
import Button from "./button";
import { AddIcon, CollectionIcon, LogoutIcon, SearchIcon, SettingsIcon, StudentCardIcon } from "./icons";

export default function Navbar() {
  var router = useRouter();
  var user = useAppSelector(selectUserData);

  return (
    <nav className="h-[60px] px-6 py-2 flex justify-between items-center">
      <Link href="/">
        <div className="w-[88px] h-11 overflow-hidden rounded-xl cursor-pointer">
          <Image
            src="/gifs/sit.gif"
            width={88}
            height={44}
            layout="fixed"
            alt="Gif"
            className="rounded-xl object-cover"
          />
        </div>
      </Link>

      <div className="flex justify-end items-center gap-4">
        <Button variant="text" size="md" onClick={() => {}} label="Explore" />
        <Button variant="text" size="md" onClick={() => {}} label="Teach" />
        <Button variant="text" size="md" onClick={() => {}} label="Search" />
        <div className="h-[22px] w-[1px] bg-gray-200"></div>

        {!user && (
          <Button
            variant="outlined"
            size="md"
            onClick={() => router.push("/auth/login")}
            label="Login"
          />
        )}
        {!user && (
          <Button
            variant="contained"
            size="md"
            onClick={() => router.push("/auth/signup")}
            label="Signup"
          />
        )}
        {user && (
          <Button
            variant="icon"
            size="md"
            startIcon={<SettingsIcon className="fill-black" />}
            onClick={() => {}}
            label="Settings"
          />
        )}
        {user && <AvatarDropdown />}
      </div>
    </nav>
  );
}

function AvatarDropdown() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { wrapperRef, isOpen, setIsOpen } = useDropdown();

  async function handleLogout() {
    await dispatch(logoutThunk());
    router.push("/auth/login");
  }

  async function createCourse() {
    var courseId = await (await dispatch(createCourseThunk())).payload;
    if (courseId) router.push(`/admin/c/${courseId}`);
  }

  async function handleInstructorSignup() {
    await dispatch(instructorSignupThunk());
  }

  function Item({ icon, label, feedback }: { icon; label; feedback? }) {
    return (
      <div className="h-9 flex items-center gap-2 px-2 rounded-lg cursor-pointer">
        <span className="h-5 w-5 flex justify-center items-center">{icon}</span>
        <div className="text-[#686868] font-semibold font-urbanist flex-grow">
          {label}
        </div>

        <div className="h-6 w-6 rounded-sm flex justify-center items-center">
          {feedback}
        </div>
      </div>
    );
  }

  function MeGroup() {
    return (
      <div className="flex flex-col">
        <div className="pl-2 pb-3 font-gilroy font-bold text-[12.8px]">ME</div>
        <Item
          label="Enrolled in"
          icon={<CollectionIcon className="fill-[#686868]" />}
          feedback="🔥"
        />
        <Item
          label="Search in courses"
          icon={<SearchIcon className="fill-[#686868]" />}
        />
        <div onClick={handleLogout}>
          <Item
            label="Logout"
            icon={<LogoutIcon className="fill-[#686868]" />}
          />
        </div>
      </div>
    );
  }

  function TeacherGroup() {
    return (
      <div className="flex flex-col">
        <div className="pl-2 pb-3 font-gilroy font-bold text-[12.8px]">
          TEACH
        </div>
        <div onClick={handleInstructorSignup}>
          <Item
            label="Start teaching"
            icon={<StudentCardIcon className="fill-[#686868]" />}
            feedback="✌🏼"
          />
        </div>
        <div onClick={createCourse}>
          <Item
            label="Create a course"
            icon={<AddIcon className="fill-[#686868]" />}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <Avatar
          src={
            "https://wegotthiscovered.com/wp-content/uploads/2022/07/Iron-Man-Marvel.jpg"
          }
        />
      </div>

      {isOpen && (
        <div className="z-10 absolute top-12 right-0 w-[240px] px-2 py-3 rounded-xl bg-white border border-solid border-gray-100 shadow-lg flex flex-col gap-4">
          <MeGroup />
          <TeacherGroup />
        </div>
      )}
    </div>
  );
}
