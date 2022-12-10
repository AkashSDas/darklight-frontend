import { SearchIcon } from "@components/icons/search";

export default function SearchBlockInput() {
  return (
    <div className="mx-4 text-text2 h-10 min-h-[40px] px-[10px] py-1 flex items-center gap-3 bg-background2 rounded-xl border border-solid border-border">
      <SearchIcon size="20" />
      <input
        type="text"
        placeholder="Search"
        className="outline-none bg-background2 font-urbanist font-medium"
      />
    </div>
  );
}
