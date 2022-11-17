import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import fetchAPI from "services";

async function getAllCoursesService(next: string) {
  var res = await fetchAPI("/course/all", { method: "get", params: [next] });
  if (res.status < 300) {
    return res.data;
  } else {
    toast.error("Error fetching courses");
  }
}

export default function CoursesPage() {
  var [next, setNext] = useState("");
  var [hasNext, setHasNext] = useState(false);
  var [loading, setLoading] = useState(false);
  var [courses, setCourses] = useState([]);
  var [initLoading, setInitLoading] = useState(false);

  async function getCourses() {
    setLoading(true);
    var response = await getAllCoursesService(next);
    setCourses(courses.concat(response.results));
    setNext(response.next);
    setHasNext(response.hasNext);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      setInitLoading(true);
      await getCourses();
      setInitLoading(false);
    })();
  }, []);

  return (
    <main className="px-8 py-8 flex flex-col gap-8 items-center">
      <h1 className="font-gilroy font-extrabold text-[39.1px] text-center">
        🎁 Courses picked for you
      </h1>

      <div className="grid grid-flow-row grid-cols-3 gap-4 max-w-[964px]">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {hasNext ? (
        <button onClick={async () => await getCourses()}>
          {loading ? "Loading..." : "Load more"}
        </button>
      ) : initLoading ? (
        <p>Loading...</p>
      ) : (
        <p>No more courses</p>
      )}
    </main>
  );
}

function CourseCard({ course }) {
  var fallbackImgURL =
    "https://cdn.dribbble.com/users/27766/screenshots/3488007/media/30313b019754da503ec0860771a5536b.png?compress=1&resize=400x300";

  return (
    <Link href={`/course/${course._id}`}>
      <div className="w-[300px] flex flex-col gap-2 overflow-hidden bg-white hover:shadow-sm cursor-pointer">
        <img
          className="object-cover w-[300px] h-[200px] rounded-md"
          src={course.coverImage?.imgURL ?? fallbackImgURL}
          alt=""
        />

        <div className="flex gap-2 items-center">
          <img
            className="w-[30px] h-[30px] rounded-xl object-cover"
            src={
              course.instructors[0].profileImage?.URL ??
              "data:image/png;base64,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"
            }
            alt=""
          />

          <span className="font-urbanist font-medium text-[#7D8082] text-[12.9px]">
            Taught by{" "}
            <span className="font-bold italic">
              {course.instructors[0].username}
            </span>
          </span>
        </div>

        <h3 className="font-gilroy font-extrabold text-[20px] leading-[100%]">
          {course.title}
        </h3>

        <div className="font-urbanist flex flex-wrap">
          <span className="font-bold mr-1">{"Skills you'll gain"}</span>
          {course.tags.map((tag) => (
            <span key={tag} className="text-[#686868] font-medium mr-1">
              {`${tag}, `}
            </span>
          ))}
        </div>

        <div>
          <div className="h-[28px] px-[2px] flex items-center border border-solid border-[#E9E9E9] w-fit rounded-md">
            <div className="w-5 h-5 flex items-center justify-center">🥋</div>
            <div className="font-urbanist font-medium text-[#686868] px-1">
              {course.difficulty}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
