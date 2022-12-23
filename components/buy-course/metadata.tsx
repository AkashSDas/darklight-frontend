import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { useAppDispatch, useBuyCourse } from "@lib/hooks.lib";
import { setShowDynamicHeader } from "@store/buy-course/slice";

dayjs.extend(relativeTime);

export default function Metadata() {
  var { info } = useBuyCourse();

  var ref = useRef(null);
  var isInView = useInView(ref);
  var dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setShowDynamicHeader(!isInView));
  }, [isInView, dispatch]);

  function Badge({ children }: { children: string }) {
    return (
      <span className="flex justify-center items-center px-[3px] py-[1px] bg-background2 rounded-sm">
        {children}
      </span>
    );
  }

  return (
    <>
      {/* Heading */}
      <h1 className="font-gilroy text-[40px] font-extrabold text-text1">
        {info?.title}
      </h1>

      {/* Basic info */}
      <div ref={ref} className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-3">
          <Badge>{dayjs(new Date(info?.lastEditedOn)).fromNow()}</Badge>
          <Badge>12h</Badge>
          <Badge>
            {info?.difficulty[0].toUpperCase() + info?.difficulty.slice(1)}
          </Badge>
          <Badge>{"⭐".repeat(Math.abs(info?.rating ?? 1))}</Badge>
          <Badge>{info?.enrolled + " enrolled"}</Badge>
        </div>

        {/* <RegularButton variant="contained">
          <>Enroll for ₹{info?.price}</>
        </RegularButton> */}
      </div>
    </>
  );
}
