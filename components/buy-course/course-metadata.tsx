import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useInView } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { useAppDispatch, useBuyCourse, useUser } from "@lib/hooks.lib";
import { setShowDynamicHeader } from "@store/buy-course/slice";

import { buyCourse } from "../../services/enrolled-course.service";

dayjs.extend(relativeTime);

export default function CourseMetadata(): JSX.Element {
  var ref = useRef(null);
  var isInView = useInView(ref);
  var dispatch = useAppDispatch();
  var { info, course } = useBuyCourse();
  var [loading, setLoading] = useState(false);
  var { accessToken, user } = useUser();
  var router = useRouter();

  // update based on whether the element is in view
  useEffect(
    function updateDynamicHeader() {
      dispatch(setShowDynamicHeader(!isInView));
    },
    [isInView, dispatch]
  );

  function Badge({ children }: { children: string }): JSX.Element {
    return (
      <span className="px-[3px] py-[1px] flex justify-center items-center bg-background2 rounded-sm">
        {children}
      </span>
    );
  }

  async function handleEnroll() {
    if (!course || loading) return;
    if (!user) {
      toast.error("Please login to enroll");
      return;
    }

    setLoading(true);
    var response = await buyCourse(course._id, accessToken);
    setLoading(false);

    if (response.success) {
      toast.success("Enrolled successfully");
      router.push(`/course/${response.enrolledCourse.course}/learn`);
    } else toast.error("Something went wrong");
  }

  return (
    <>
      {/* Heading */}
      <h1 className="font-gilroy text-[40px] font-extrabold text-text1">
        {info?.title}
      </h1>

      {/* Basic info */}
      <div ref={ref} className="flex gap-1 items-center justify-between">
        <div className="flex gap-3 items-center">
          <Badge>{dayjs(new Date(info?.lastEditedOn)).fromNow()}</Badge>
          <Badge>Course duration is 12h</Badge>
          <Badge>
            {info?.difficulty[0].toUpperCase() +
              info?.difficulty.slice(1) +
              " level"}
          </Badge>
          <Badge>{"⭐".repeat(Math.abs(info?.rating ?? 1))}</Badge>
          <Badge>{info?.enrolled + " enrolled"}</Badge>
        </div>

        <button
          onClick={handleEnroll}
          disabled={loading}
          className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
        >
          {loading ? "Loading..." : ` Enroll for ₹${info?.price}`}
        </button>
      </div>
    </>
  );
}
