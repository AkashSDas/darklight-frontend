import { useAppSelector, useEnrolledCourse, useLesson } from "@lib/hooks.lib";

export default function VideoPlayer(): JSX.Element {
  var { course } = useEnrolledCourse();
  var { breadcrum } = useAppSelector((state) => state.enrolledCourse);
  var { lesson } = useLesson(course?._id, breadcrum?.group?._id);

  return (
    <section className="mb-4">
      {lesson?.video ? (
        <video className="w-full" controls>
          <source src={lesson.video.URL} type="video/mp4" />
        </video>
      ) : null}
    </section>
  );
}
