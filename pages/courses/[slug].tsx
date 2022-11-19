import moment from "moment";
import { useRouter } from "next/router";
import useSWR from "swr";

import Button from "@components/shared/button";
import { useAppDispatch } from "@lib/hooks";
import fetchAPI from "@lib/service";
import { buyCourseThunk } from "@store/course/thunk";

async function getCourseService(slug: string) {
  var res = await fetchAPI("/course/" + slug, { method: "get" });
  if (res.status < 300) return res.data;
}

export default function CourseSellPage() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { data, error, isValidating } = useSWR(
    `/api/course/slug=${router.query?.slug}`,
    () => {
      return getCourseService(router.query?.slug as string);
    }
  );

  var fallbackImgURL =
    "https://cdn.dribbble.com/users/27766/screenshots/3488007/media/30313b019754da503ec0860771a5536b.png?compress=1&resize=400x300";

  if (error) return <div>error</div>;
  if (!data || isValidating) return <div>loading...</div>;

  function EmojiBadge({ emoji, label }) {
    return (
      <div className="h-[28px] px-[2px] flex items-center border border-solid border-[#E9E9E9] w-fit rounded-md">
        <div className="w-5 h-5 flex items-center justify-center">{emoji}</div>
        <div className="font-urbanist font-medium text-[14px] text-[#686868] px-1">
          {label}
        </div>
      </div>
    );
  }

  return (
    <main className="flex justify-center gap-8 py-11 px-6">
      <div className="flex flex-col gap-4 max-w-[600px] w-full">
        <h1 className="font-gilroy font-extrabold text-[39.1px] leading-[100%]">
          {data.title}
        </h1>

        <p className="font-urbanist font-medium leading-[140%] text-[#686868]">
          {data.description}
        </p>

        <div className="flex gap-2">
          <EmojiBadge
            emoji={"📆"}
            label={moment(data.lastEditedOn).format("MMM Do YY")}
          />

          <EmojiBadge emoji={"🥋"} label={`${data.difficulty} level`} />
          <EmojiBadge emoji={"🗂️"} label={`${data.modules.length} modules`} />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <h4 className="font-gilroy font-extrabold text-[20px] leading-[100%]">
            Modules
          </h4>

          <hr />

          {data.modules.map((module, idx) => (
            <div key={module.id} className="flex flex-col gap-2 py-[6px]">
              <div className="flex gap-2 font-gilroy font-extrabold text-[18px]">
                <span className="text-[#B6B6B6]">0{idx + 1}</span>
                <span>{module.title}</span>
              </div>

              <p className="font-urbanist font-medium leading-[135%] text-[#686868] text-[14px]">
                {module.description ??
                  "Watch this video before starting the course!"}
              </p>

              <div className="flex flex-col gap-2 mt-[6px]">
                {module.lessons.map((lesson, idx) => (
                  <div key={lesson._id} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {lesson.emoji}
                    </div>

                    <div className="font-urbanist text-[#686868] font-semibold flex-grow">
                      {lesson.title}
                    </div>

                    {lesson.isFree && (
                      <div className="h-6 flex items-center justify-center rounded-md px-1 font-urbanist text-[14px] font-medium text-white bg-green-600">
                        Free
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-[600px] w-full">
        <img
          className="object-cover w-[600px] h-[315px] rounded-md"
          src={data.coverImage?.imgURL ?? fallbackImgURL}
          alt=""
        />

        <div className="flex flex-wrap gap-3">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 h-7 w-fit rounded-lg flex justify-center items-center bg-[#F7F7F7] text-[#686868] font-urbanist text-[14px] font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <img
            className="w-[30px] h-[30px] rounded-xl object-cover"
            src={
              data.instructors[0].profileImage?.URL ??
              "data:image/png;base64,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"
            }
            alt=""
          />

          <span className="font-urbanist text-[18px] font-medium text-[#7D8082]">
            Taught by{" "}
            <span className="font-bold italic">
              {data.instructors[0].username}
            </span>
          </span>
        </div>

        <div className="w-fit px-3">
          <Button
            onClick={async () => {
              var hasPurchased = await (
                await dispatch(buyCourseThunk(data.id))
              ).payload;
              if (hasPurchased) {
                router.push(`/learn/${data.id}`);
              }
            }}
            label="Enroll"
            variant="contained"
            size="lg"
          />
        </div>
      </div>
    </main>
  );
}
