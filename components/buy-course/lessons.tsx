import { useState } from "react";

import { TextBadge } from "@components/badges/text";
import { ArrowDownIcon } from "@components/icons/arrow-down";
import { useBuyCourse } from "@lib/hooks.lib";

export default function Lessons() {
  var { groups } = useBuyCourse();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-gilroy text-[25px] font-extrabold text-text1">
        Lessons
      </h2>

      <div className="flex flex-col gap-4">
        {groups?.map((group: any) => (
          <Group key={group._id} group={group} />
        ))}
      </div>
    </div>
  );
}

function Group({ group }: any) {
  var [open, setOpen] = useState(false);

  function Lesson({ lesson }: any) {
    return (
      <div className="flex items-center gap-3 px-[6px] py-1">
        <TextBadge variant="regular">{lesson.emoji ?? "📼"}</TextBadge>
        <div className="flex-grow font-urbanist font-medium text-text1 text-base">
          {lesson.title ?? "Untitled"}
        </div>

        {lesson.free && (
          <div className="h-6 rounded-full flex items-center justify-center px-[10px] bg-[#4285F4] text-white text-sm">
            Free
          </div>
        )}
        <div className="h-6 rounded-full flex items-center justify-center px-[10px] bg-background3 text-sm">
          {lesson.duration ?? "00:00"}
        </div>
      </div>
    );
  }

  return (
    <div className=" border-b border-solid border-b-border pb-2">
      {/* Group info */}
      <div className="flex items-center gap-3 px-[6px] py-[6px]">
        <TextBadge variant="regular">{group.emoji ?? "💽"}</TextBadge>
        <div className="flex-grow font-urbanist font-medium text-text1 text-lg">
          {group.title}
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-md cursor-pointer hover:bg-background3 active:bg-border flex justify-center items-center"
        >
          <ArrowDownIcon size="20" />
        </div>
      </div>

      {/* Lessons inside the group */}
      {open && (
        <>
          <p className="leading-[140%] text-sm font-medium font-urbanist px-3 py-2 flex items-center">
            {group.description ??
              "There was a lot that happened this week! First, Marques and Andrew discuss the madness that has been going on with Twitter and Elon Musk. Then they talk about the Metaverse before reminiscing about smartphone features that they miss. Lastly, we wrap up with some trivia!"}
          </p>

          <div>
            {group.lessons?.map((lesson: any) => (
              <Lesson key={lesson._id} lesson={lesson} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
