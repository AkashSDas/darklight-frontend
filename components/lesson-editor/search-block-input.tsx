import { SearchIcon } from "@components/shared/icons";

export default function SearchBlockInput(): JSX.Element {
  return (
    <div className="mx-4 px-[10px] py-1 h-10 min-h-[40px] flex gap-3 items-center bg-background2 rounded-xl border border-solid border-border">
      <div className="icon">
        <SearchIcon size="size_5" />
      </div>
      <input
        type="text"
        placeholder="Search"
        className="outline-none bg-background2 font-urbanist font-medium"
      />
    </div>
  );
}
