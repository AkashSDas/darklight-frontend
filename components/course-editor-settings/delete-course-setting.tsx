import { toast } from "react-hot-toast";

import SettingSection from "./setting-section";

export default function DeleteCourseSetting(): JSX.Element {
  var emoji = "💣";
  var title = "Delete";
  var description = "Delete the entire course";
  var info = { emoji, title, description };

  async function handleDelete() {
    toast.success("Soon you will be able to delete your course", {
      icon: "🚧",
    });
  }

  return (
    <SettingSection {...info}>
      <button
        onClick={handleDelete}
        className="px-5 h-11 bg-light-error text-error rounded-[18px]  hover:bg-[#FFDDDB] active:bg-[#FFD3D1]"
      >
        Delete
      </button>
    </SettingSection>
  );
}
