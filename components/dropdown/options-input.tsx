// TODO: handle open and close states

import { useFormik } from "formik";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";

import { MultiplyIcon } from "@components/icons";

// TODO: handle selected state
function OptionsInput({
  opts,
  handleAdd,
  handleRemove,
  onUnmount,
}: {
  opts: string[];
  handleAdd: (opt: string) => void;
  handleRemove: (opt: string) => void;
  onUnmount?: (opts: string[]) => void;
}) {
  var [options, setOptions] = useState(() =>
    opts.map((opt) => ({ value: opt, id: nanoid() }))
  );
  var formik = useFormik({
    initialValues: { input: "" },
    onSubmit: function handleOptsDropdownSubmit() {
      setOptions([...options, { value: formik.values.input, id: nanoid() }]);
      formik.setFieldValue("input", "");
      handleAdd(formik.values.input);
    },
  });

  // TODO: check if the opts has changed and if so then update in the back-end
  var optionsCache = useRef(opts);
  useEffect(() => {
    optionsCache.current = options.map((o) => o.value);
    return () => {
      onUnmount?.(optionsCache.current);
    };
  }, [options]);

  return (
    <div className="w-[300px] absolute top-0 left-0 shadow-lg rounded-md">
      <div className="flex flex-col max-w-[calc(-24px+100vw)] min-w-[180px] h-full max-h-[70vh]">
        <div className="rounded-md flex flex-wrap p-1 gap-1 bg-grey1 flex-shrink-0 max-h-[240px] overflow-x-hidden overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt.id}
              className="rounded-[4px] flex-shrink px-[6px] py-1 flex items-center bg-grey2 min-w-0"
            >
              <div className="flex-shrink text-[14px] text-grey7 whitespace-nowrap overflow-hidden text-ellipsis">
                {opt.value}
              </div>
              <div
                className="w-5 h-5 cursor-pointer flex-shrink-0"
                onClick={function removeOption() {
                  setOptions(options.filter((option) => option.id != opt.id));
                  handleRemove(opt.value);
                }}
              >
                <MultiplyIcon />
              </div>
            </div>
          ))}

          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="input"
              value={formik.values.input}
              onChange={formik.handleChange}
              placeholder="Enter value"
              className="placeholder:text-[14px] text-[14px] border border-blue2 rounded-[4px] flex-shrink px-[6px] py-1 flex items-center bg-grey2 min-w-0"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default OptionsInput;
