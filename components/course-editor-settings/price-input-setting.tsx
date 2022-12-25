import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { updateCourseSettings } from "services/course.service";

import { useEditableCourse, useUser } from "@lib/hooks.lib";

import SettingSection from "./setting-section";

export default function PriceInputSetting(): JSX.Element {
  var emoji = "💰";
  var title = "Price";
  var description = "Amount to charge your customers";
  var info = { emoji, title, description };

  var { accessToken } = useUser();
  var { course, mutateCourse, courseId } = useEditableCourse();
  var [price, setPrice] = useState(course?.price);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var priceCallback = useCallback(
    debounce(async (value) => {
      if (value && courseId && accessToken) {
        let update = { price: value };
        await updateCourseSettings(accessToken, courseId, update);
      }
    }, 500),

    [courseId]
  );

  async function changePrice(value: string) {
    let price = value == "" ? 0 : Number(value);

    mutateCourse(
      (data) => ({ ...data, course: { ...data?.course, price } } as any),
      false
    );

    await priceCallback(price);
  }

  return (
    <SettingSection {...info}>
      <input
        type="number"
        value={price}
        onChange={async (e) => {
          setPrice(e.target.value == "" ? null : Number(e.target.value));
          await changePrice(e.target.value);
        }}
        placeholder="Price"
        className="h-10 rounded-[14px] px-3 outline-none bg-background2 border border-solid border-border"
      />
    </SettingSection>
  );
}
