import { useRouter } from "next/router";
import { useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon, AttachmentIcon, DiscussionIcon, GridIcon, NotePadIcon } from "@components/shared/icons";
import { useAppDispatch, useAppSelector, useEnrolledCourse, useLesson } from "@lib/hooks.lib";
import { setLessonBreadcrum } from "@store/enrolled-course/slice";

import ContentBlock from "./content-block";

export default function DisplayLessonContent(): JSX.Element {
  type Tab = "content" | "discussion" | "notes" | "attachments";
  var [tab, setTab] = useState<Tab>("content");
  var { getNavigationList } = useEnrolledCourse();
  var router = useRouter();
  var dispatch = useAppDispatch();

  function IconButton({
    icon,
    label,
    action,
  }: {
    icon: JSX.Element;
    label: string;
    action: CallableFunction;
  }): JSX.Element {
    return (
      <button
        onClick={() => action()}
        className={`h-9 px-2 flex gap-2 items-center justify-center text-sm rounded-lg ${
          label.toLowerCase() == tab ? "bg-background3" : ""
        }`}
      >
        <span className="icon">{icon}</span>
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="w-full">
      <section className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <IconButton
            icon={<GridIcon size="size_4" />}
            label="Content"
            action={() => setTab("content")}
          />

          <IconButton
            icon={<AttachmentIcon size="size_4" />}
            label="Attachments"
            action={() => setTab("attachments")}
          />

          <IconButton
            icon={<DiscussionIcon size="size_4" />}
            label="Discussion"
            action={() => setTab("discussion")}
          />

          <IconButton
            icon={<NotePadIcon size="size_4" />}
            label="Notes"
            action={() => setTab("notes")}
          />
        </div>

        <div className="flex gap-2 items-center">
          <IconButton
            icon={<ArrowLeftIcon size="size_4" />}
            label="Previous"
            action={() => {
              var list = getNavigationList();
              var index = list.findIndex(
                (item) => item.id == router.query?.lesson
              );

              if (index > 0) {
                dispatch(
                  setLessonBreadcrum({
                    group: {
                      _id: list[index - 1].group._id,
                      title: list[index - 1].group.title,
                      emoji: list[index - 1].group.emoji,
                    },
                    lesson: {
                      _id: list[index - 1].id,
                      title: list[index - 1].title,
                      emoji: list[index - 1].emoji,
                    },
                  })
                );

                router.push(
                  `/course/${router.query?.id}/learn?lesson=${
                    list[index - 1].id
                  }`,
                  undefined,
                  { shallow: true }
                );
              }
            }}
          />

          <button
            onClick={() => {
              var list = getNavigationList();
              var index = list.findIndex(
                (item) => item.id == router.query?.lesson
              );

              if (index < list.length - 1) {
                dispatch(
                  setLessonBreadcrum({
                    group: {
                      _id: list[index + 1].group._id,
                      title: list[index + 1].group.title,
                      emoji: list[index + 1].group.emoji,
                    },
                    lesson: {
                      _id: list[index + 1].id,
                      title: list[index + 1].title,
                      emoji: list[index + 1].emoji,
                    },
                  })
                );

                router.push(
                  `/course/${router.query?.id}/learn?lesson=${
                    list[index + 1].id
                  }`,
                  undefined,
                  { shallow: true }
                );
              }
            }}
            className="h-9 px-2 flex gap-2 items-center justify-center text-sm rounded-lg"
          >
            <span>Next</span>
            <span className="icon">
              <ArrowRightIcon size="size_4" />
            </span>
          </button>
        </div>
      </section>

      <hr className="bg-border h-[1px] w-full my-4" />

      <section className="flex flex-col gap-2">
        {tab == "content" ? <Content /> : null}
      </section>
    </div>
  );
}

function Content(): JSX.Element {
  var { course } = useEnrolledCourse();
  var { breadcrum } = useAppSelector((state) => state.enrolledCourse);
  var { lesson, isLoading } = useLesson(course?._id, breadcrum?.group?._id);
  var router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? <div>Loading...</div> : null}
      {lesson?.content.map((block: any, index: number) => {
        return <ContentBlock key={block.id} block={block} />;
      })}
    </div>
  );
}
