import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Navbar } from "@components/bar/navbar";
import { RegularButton } from "@components/button/regular";
import About from "@components/buy-course/about";
import Instructor from "@components/buy-course/instructor";
import Lessons from "@components/buy-course/lessons";

export default function CoursePage() {
  function Badge({ children }: { children: string }) {
    return (
      <span className="flex justify-center items-center px-[3px] py-[1px] bg-background2 rounded-sm">
        {children}
      </span>
    );
  }

  var ref = useRef(null);
  var isInView = useInView(ref);
  var [showCourseInfoNav, setShowCourseInfoNav] = useState(false);

  useEffect(() => {
    if (!isInView) setShowCourseInfoNav(true);
    else setShowCourseInfoNav(false);
  }, [isInView]);

  var variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <Navbar />

      <main className="flex justify-between mx-8 mt-4">
        <div className="w-full max-w-[800px] flex flex-col gap-3">
          <motion.div
            variants={variants}
            initial="hidden"
            animate={showCourseInfoNav ? "visible" : "hidden"}
            transition={{ duration: 0.3 }}
            className="flex fixed z-20 top-0 w-full max-w-[800px] items-center gap-4 py-2 bg-background1 border-b border-solid border-b-border"
          >
            <div className="w-[240px] h-[120px] relative">
              <Image
                src="https://media.giphy.com/media/cS83sLRzgVOeY/giphy.gif"
                alt="Course cover image"
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            <h2 className="font-gilroy text-[25px] font-extrabold text-text1 flex-grow">
              Dynamic Scope
            </h2>

            <RegularButton variant="contained">Enroll for ₹399</RegularButton>
          </motion.div>

          {/* Emoji and cover image */}
          <div className="w-full h-[300px] relative mb-4">
            <Image
              src="https://media.giphy.com/media/cS83sLRzgVOeY/giphy.gif"
              alt="Course cover image"
              fill
              className="object-cover"
            />

            <div className="absolute -bottom-4 left-4 text-[60px] leading-[100%] w-fit h-fit flex justify-center items-center rounded-[3px] bg-background3 px-[3px] py-[1px]">
              🌕
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-gilroy text-[40px] font-extrabold text-text1">
            Next.js Firebase Full Course
          </h1>

          {/* Paragraph */}
          <p className="leading-[140%] font-medium font-urbanist">
            Next.js Firebase - The Full Course takes you from zero to a
            production-ready hybrid-rendered webapp. Learn how to build a
            high-performance React app that features realtime data from Firebase
            and multiple server-side rendering paradigms with Next.js
          </p>

          {/* Basic info */}
          <div ref={ref} className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-3">
              <Badge>Last updated on 21 Nov 22</Badge>
              <Badge>12h</Badge>
              <Badge>Intermediate</Badge>
              <Badge>⭐⭐⭐⭐⭐</Badge>
              <Badge>17k enrolled</Badge>
            </div>

            <RegularButton variant="contained">Enroll for ₹399</RegularButton>
          </div>

          <hr className="bg-border h-[1px] w-full my-4" />

          {/* Content Tabbar */}
          <div className="flex items-center gap-3">
            <div className="h-11 cursor-pointer rounded-2xl hover:bg-background3 active:bg-border px-5 flex justify-center items-center font-urbanist font-medium">
              About
            </div>
            <div className="h-11 cursor-pointer rounded-2xl hover:bg-background3 active:bg-border px-5 flex justify-center items-center font-urbanist font-medium">
              Instructors
            </div>
            <div className="h-11 cursor-pointer rounded-2xl hover:bg-background3 active:bg-border px-5 flex justify-center items-center font-urbanist font-medium">
              Syllabus
            </div>
            <div className="h-11 cursor-pointer rounded-2xl hover:bg-background3 active:bg-border px-5 flex justify-center items-center font-urbanist font-medium">
              FAQs
            </div>
          </div>

          <hr className="bg-border h-[1px] w-full my-4" />

          {/* About section */}
          <About />

          <hr className="bg-border h-[1px] w-full my-8" />

          {/* Instructors */}
          <section className="flex flex-col gap-4">
            <h2 className="font-gilroy text-[25px] font-extrabold text-text1">
              Instructors
            </h2>

            <div className="flex flex-wrap gap-8">
              <Instructor />
              <Instructor />
            </div>
          </section>

          <hr className="bg-border h-[1px] w-full my-8" />

          {/* Lessons */}
          <Lessons />
        </div>
      </main>
    </div>
  );
}
