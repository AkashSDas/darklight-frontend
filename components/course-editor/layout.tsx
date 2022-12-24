import CourseEditorSidebar from "@components/shared/course-editor-sidebar";

import Navbar from "./navbar";
import Sidebar from "./sidebar";

function CourseEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <CourseEditorSidebar />

      <div className="ml-[300px] w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default CourseEditorLayout;
