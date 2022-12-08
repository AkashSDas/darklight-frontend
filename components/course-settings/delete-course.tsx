import { TextBadge } from "../badges/text";

export default function DeleteCourse() {
  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div>
          <TextBadge variant="regular">💣</TextBadge>{" "}
          <span className="text-text1">Delete</span>
        </div>

        <p className="text-sm">Delete the entire course</p>
      </div>

      <div className="max-w-[300px] flex items-center justify-end w-full">
        <button className="bg-light-error text-error h-11 rounded-[18px] px-5">
          Delete
        </button>
      </div>
    </section>
  );
}
