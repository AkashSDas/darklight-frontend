import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

import { useEditableCourse, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";
import { TextBadge } from "../shared/text-badge";

export default function PriceInput() {
  var { course, mutateCourse, courseId } = useEditableCourse();
  var [price, setPrice] = useState(course?.price);
  var { accessToken } = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var priceCallback = useCallback(
    debounce(async (value) => {
      if (value && courseId && accessToken) {
        let update = {
          price: value,
          lastEditedOn: new Date(Date.now()),
        };
        await updateCourseSettings(accessToken, courseId, update);
      }
    }, 500),

    [courseId]
  );

  async function changePrice(value: string) {
    let price = value == "" ? 0 : Number(value);

    let update = {
      price,
      lastEditedOn: new Date(Date.now()),
    };
    let optimisticData = {
      success: true,
      course: { ...course, ...update },
      error: null,
    };

    await mutateCourse(async () => optimisticData, {
      optimisticData,
      revalidate: false,
    });

    await priceCallback(price);
  }

  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div>
          <TextBadge variant="regular">💰</TextBadge>{" "}
          <span className="text-text1">Price</span>
        </div>

        <p className="text-sm">Amount to charge your customers</p>
      </div>

      <div className="max-w-[300px] flex items-center justify-end w-full">
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
      </div>
    </section>
  );
}
