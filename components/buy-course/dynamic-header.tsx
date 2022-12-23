import { motion } from "framer-motion";
import Image from "next/image";

import { useAppSelector, useBuyCourse } from "@lib/hooks.lib";

export default function DynamicHeader() {
  var { info } = useBuyCourse();
  var show = useAppSelector((state) => state.buyCourse.showDynamicHeader);
  var variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
      className="flex fixed z-20 top-0 w-full max-w-[800px] items-center gap-4 py-2 bg-background1 border-b border-solid border-b-border"
    >
      <div className="w-[240px] h-[120px] relative">
        <Image
          src={
            info?.coverImageURL ??
            "https://media.giphy.com/media/cS83sLRzgVOeY/giphy.gif"
          }
          alt="Course cover image"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      <h2 className="font-gilroy text-[25px] font-extrabold text-text1 flex-grow">
        {info?.title}
      </h2>

      {/* <RegularButton variant="contained">
        <>Enroll for ₹{info?.price}</>
      </RegularButton> */}
    </motion.div>
  );
}
