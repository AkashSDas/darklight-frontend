import Image from "next/image";

import { useBuyCourse } from "@lib/hooks.lib";

export default function Banner() {
  var { info } = useBuyCourse();

  return (
    <div className="w-full h-[300px] relative mb-4">
      <Image
        src={
          info?.coverImageURL ??
          "https://media.giphy.com/media/cS83sLRzgVOeY/giphy.gif"
        }
        alt="Course cover image"
        fill
        className="object-cover"
      />

      <div className="absolute -bottom-4 left-4 text-[60px] leading-[100%] w-fit h-fit flex justify-center items-center rounded-[3px] bg-background3 px-[3px] py-[1px]">
        {info?.emoji}
      </div>
    </div>
  );
}
