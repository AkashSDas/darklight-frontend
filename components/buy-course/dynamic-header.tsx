import { motion } from "framer-motion";
import Image from "next/image";

import { useAppSelector, useBuyCourse } from "@lib/hooks.lib";

export default function DynamicHeader(): JSX.Element {
  var { info } = useBuyCourse();
  var show = useAppSelector((state) => state.buyCourse.showDynamicHeader);
  var variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  function CoverImage(): JSX.Element {
    return (
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
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
      className="fixed z-20 top-0 py-2 w-full max-w-[800px] flex gap-4 items-center bg-background1 border-b border-solid border-b-border"
    >
      <CoverImage />

      <h2 className="flex-grow font-gilroy text-[25px] font-extrabold text-text1">
        {info?.title}
      </h2>

      <button className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]">
        Enroll for ₹{info?.price}
      </button>
    </motion.div>
  );
}
