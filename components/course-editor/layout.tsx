import Navbar from "./navbar";
import Sidebar from "./sidebar";

function CourseEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-[300px] w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default CourseEditorLayout;
