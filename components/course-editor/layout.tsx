import Navbar from "./navbar";
import Sidebar from "./sidebar";

function CourseEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />

      <div className="ml-[300px]">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default CourseEditorLayout;
