import { useState } from "react";

function IndexPage() {
  return <div className="p-6"></div>;
}

function Input() {
  var [value, setValue] = useState("");

  return (
    <div className="w-[300px] flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label
          htmlFor="username"
          className="font-urbanist font-semibold text-sm"
        >
          Username
        </label>
        <span className="font-urbanist font-semibold text-sm text-green-600">
          Available
        </span>
      </div>

      <div className="flex items-center h-11 px-3 rounded-xl border border-solid border-gray-300 font-urbanist text-base">
        <input
          id="username"
          name="username"
          value={value}
          type="password"
          onChange={(e) => setValue(e.target.value)}
          className="outline-none flex-grow font-mono left-2 text-xl"
        />

        <div className="h-6 w-6 flex justify-center items-center rounded-md animate-pulse">
          💪
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
