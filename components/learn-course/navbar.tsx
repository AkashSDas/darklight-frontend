import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AttachmentIcon, DiscussionIcon, NotePadIcon, NotificationIcon, SearchIcon } from "@components/shared/icons";
import { useEnrolledCourse } from "@lib/hooks.lib";

import BreadCrum from "./breadcrum";
import MoreButton from "./more-button";

dayjs.extend(relativeTime);

function LastEditedOn(): JSX.Element {
  return (
    <div className="px-2 h-[34px] flex items-center justify-center text-sm text-[#BFBFBF]">
      {/* {dayjs(new Date(getLastEditedOn())).fromNow()} */}
    </div>
  );
}

export default function Navbar(): JSX.Element {
  var { enrolledCourse: course } = useEnrolledCourse();

  if (!course) {
    return (
      <nav className="sticky top-0 z-10 pt-4 px-4 h-[76px] w-full flex items-center justify-between bg-background1"></nav>
    );
  }

  return (
    <nav className="sticky top-0 z-10 py-4 px-4 w-full flex items-center justify-between bg-background1">
      <BreadCrum />

      <div className="flex gap-3 items-center">
        <LastEditedOn />

        <button className="icon_btn">
          <NotificationIcon size="size_5" />
        </button>

        <button className="icon_btn">
          <DiscussionIcon size="size_5" />
        </button>

        <button className="icon_btn">
          <SearchIcon size="size_5" />
        </button>

        <button className="icon_btn">
          <AttachmentIcon size="size_5" />
        </button>

        <button className="icon_btn">
          <NotePadIcon size="size_5" />
        </button>

        <MoreButton />
      </div>
    </nav>
  );
}
